import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';

import * as Yup from 'yup';
import Link from 'next/link';
import { useFormik } from 'formik';
import { Button } from 'react-daisyui';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { type ReactElement, useEffect, useState, useRef } from 'react';
import type { ComponentStatus } from 'react-daisyui/dist/types';
import { getCsrfToken, signIn, useSession } from 'next-auth/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import env from '@/lib/env';
import type { NextPageWithLayout } from 'types';
import { AuthLayout } from '@/components/layouts';
import GithubButton from '@/components/auth/GithubButton';
import GoogleButton from '@/components/auth/GoogleButton';
import { Alert, InputWithLabel, Loading, Button as DrakeButton } from '@/components/shared';
import { authProviderEnabled } from '@/lib/auth';
import Head from 'next/head';
import TogglePasswordVisibility from '@/components/shared/TogglePasswordVisibility';
import AgreeMessage from '@/components/auth/AgreeMessage';
import GoogleReCAPTCHA from '@/components/shared/GoogleReCAPTCHA';
import ReCAPTCHA from 'react-google-recaptcha';
import { maxLengthPolicies } from '@/lib/common';

interface Message {
  text: string | null;
  status: ComponentStatus | null;
}

// Test credentials for easy access
const TEST_EMAIL = 'Drazoyves@gmail.com';
const TEST_PASSWORD = 'Monkey2003';

const Login: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ csrfToken, authProviders, recaptchaSiteKey }) => {
  const router = useRouter();
  const { status } = useSession();
  const { t } = useTranslation('common');
  const [recaptchaToken, setRecaptchaToken] = useState<string>('');
  const [message, setMessage] = useState<Message>({ text: null, status: null });
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const { error, success, token } = router.query as {
    error: string;
    success: string;
    token: string;
  };

  const handlePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  useEffect(() => {
    if (error) {
      setMessage({ text: error, status: 'error' });
    }

    if (success) {
      setMessage({ text: success, status: 'success' });
    }
  }, [error, success]);

  const redirectUrl = token
    ? `/invitations/${token}`
    : env.redirectIfAuthenticated;

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required().email().max(maxLengthPolicies.email),
      password: Yup.string().required().max(maxLengthPolicies.password),
    }),
    onSubmit: async (values) => {
      const { email, password } = values;

      setMessage({ text: null, status: null });

      const response = await signIn('credentials', {
        email,
        password,
        csrfToken,
        redirect: false,
        callbackUrl: redirectUrl,
        recaptchaToken,
      });

      formik.resetForm();
      recaptchaRef.current?.reset();

      if (response && !response.ok) {
        setMessage({ text: response.error, status: 'error' });
        return;
      }

      if (response && response.ok) {
        router.push(redirectUrl);
      }
    },
  });

  // Function to fill test credentials
  const fillTestCredentials = () => {
    formik.setFieldValue('email', TEST_EMAIL);
    formik.setFieldValue('password', TEST_PASSWORD);
  };

  if (status === 'loading') {
    return <Loading />;
  }

  if (status === 'authenticated') {
    router.push(redirectUrl);
  }

  return (
    <>
      <Head>
        <title>{t('sign-in')}</title>
      </Head>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">{t('sign-in')}</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t('login')}
          </p>
        </div>

        {message.text && message.status && (
          <Alert status={message.status}>{t(message.text)}</Alert>
        )}

        <div className="flex flex-col gap-4">
          {authProviders.includes('email') && (
            <Link
              href="/auth/magic-link"
              className="btn btn-outline w-full normal-case"
            >
              {t('sign-in-with-email')}
            </Link>
          )}

          {authProviders.includes('credentials') && (
            <form
              method="post"
              onSubmit={formik.handleSubmit}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-2">
                <InputWithLabel
                  type="email"
                  name="email"
                  placeholder="Email"
                  label={t('email')}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.email && formik.errors.email
                      ? t(formik.errors.email)
                      : undefined
                  }
                />
                <div className="relative">
                  <InputWithLabel
                    type={isPasswordVisible ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                    label={t('password')}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.password && formik.errors.password
                        ? t(formik.errors.password)
                        : undefined
                    }
                  />
                  <div className="absolute right-2 top-10">
                    <TogglePasswordVisibility
                      isPasswordVisible={isPasswordVisible}
                      handlePasswordVisibility={handlePasswordVisibility}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <div className="flex flex-col items-start">
                  <DrakeButton 
                    variant="outline" 
                    size="sm" 
                    type="button"
                    onClick={fillTestCredentials}
                  >
                    {t('sign-in')}
                  </DrakeButton>
                  <p className="text-xs text-accent-purple-light mt-1">
                    {t('test-credentials')}
                  </p>
                </div>
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  {t('forgot-password')}
                </Link>
              </div>

              {recaptchaSiteKey && (
                <GoogleReCAPTCHA
                  siteKey={recaptchaSiteKey}
                  onChange={(token) => {
                    setRecaptchaToken(token || '');
                  }}
                  recaptchaRef={recaptchaRef}
                />
              )}

              <div className="flex flex-col gap-2">
                <Button
                  type="submit"
                  color="primary"
                  disabled={formik.isSubmitting}
                  className="w-full"
                >
                  {formik.isSubmitting ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    t('sign-in-with-password')
                  )}
                </Button>
                <AgreeMessage text={t('sign-in-with-password')} />
              </div>
            </form>
          )}

          {authProviders.includes('google') && <GoogleButton />}
          {authProviders.includes('github') && <GithubButton />}
        </div>

        <div className="flex flex-col gap-2">
          <div className="divider">{t('or')}</div>
          <div className="text-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {t('dont-have-an-account')}
            </span>{' '}
            <Link
              href="/auth/join"
              className="text-sm text-primary hover:underline"
            >
              {t('create-a-free-account')}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

Login.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { locale } = context;

  const csrfToken = await getCsrfToken(context);
  const enabledProviders = authProviderEnabled();
  const authProviders: string[] = [];

  if (enabledProviders.email) {
    authProviders.push('email');
  }

  if (enabledProviders.credentials) {
    authProviders.push('credentials');
  }

  if (enabledProviders.google) {
    authProviders.push('google');
  }

  if (enabledProviders.github) {
    authProviders.push('github');
  }

  return {
    props: {
      csrfToken: csrfToken || '',
      authProviders,
      recaptchaSiteKey: env.recaptcha?.siteKey || '',
      ...(locale ? await serverSideTranslations(locale, ['common']) : {}),
    },
  };
};

export default Login;
