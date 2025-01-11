import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import { router } from 'expo-router';
import brand from '../../../brand/brandConfig';
import Card from '../../../components/ui/Card';
import List from '../../../components/ui/List/List';
import TextLink from '../../../components/ui/TextLink';
import useAuthStore from '../../../stores/authStore/authStore';
import FormInput from '../../../components/ui/Form/FormInput';
import FormErrors from '../../../components/ui/Form/FormErrors';
import { useForm } from 'react-hook-form';
import { recoverSchema, recoverSchemaValues } from '../../../schemas/recoverSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { StyledText } from '../../../components/ui/StyledText';

export default function RecoverPage() {
  // Initialize form with react-hook-form
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      resolver: zodResolver(recoverSchema),
    },
  });

  //Retrieving logIn, loading and error, setAuthError from useAuthStore
  const { resetPasswordWithEmail, loading, error, setAuthError, clearErrorState } = useAuthStore();

  // Initialize success state
  const [success, setSuccess] = useState(false);

  //Function to handle password recovery form submission
  const handleEmailRecoverySubmit = async (data: recoverSchemaValues) => {
    try {
      await resetPasswordWithEmail(data.email);
      setSuccess(true);
    } catch (error) {
      setAuthError(error as string);
    }
  };

  return (
    <Card>
      {success ? (
        //Display success message
        <List>
          <StyledText fontSize={'lg'} align={'center'}>
            Password reset email sent!
          </StyledText>
          {/* Text Link to go back to log in */}
          <TextLink text="Go back to login" onPress={() => router.push('/auth/login')} />
        </List>
      ) : (
        //Display password recovery form
        <List>
          <StyledText fontSize={'lg'} align={'center'}>
            Recover Your {brand.name} Password{' '}
          </StyledText>
          {/* Input for email and Reset Password Button */}
          <FormInput name="email" placeholder="Enter email" control={control} />
          <Button
            title="Reset Password"
            onPress={handleSubmit(handleEmailRecoverySubmit)}
            loading={loading}
          />

          {/* Display errors */}
          <FormErrors error={error} clearError={clearErrorState} />

          {/* Text Link to go back to log in */}
          <TextLink text="Go back to login" onPress={() => router.push('/auth/login')} />
        </List>
      )}
    </Card>
  );
}
