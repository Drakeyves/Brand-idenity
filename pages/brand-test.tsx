import React, { useState } from 'react';
import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSidePropsContext } from 'next';
import { 
  Card, 
  Button, 
  Badge, 
  LoadingSpinner, 
  InputField, 
  Select, 
  Toggle,
  ThemeToggle
} from '../components/shared';

const BrandTestPage: NextPage = () => {
  const { t } = useTranslation('common');
  const [toggleValue, setToggleValue] = useState(false);
  
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">{t('drake-brand-components')}</h1>
          <ThemeToggle showLabel />
        </div>
        
        {/* Buttons Section */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">{t('buttons')}</h2>
          <Card>
            <Card.Body>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <h3 className="text-accent-metallic-light">{t('primary')}</h3>
                  <div className="space-y-2">
                    <Button size="sm">{t('small')}</Button>
                    <Button size="md">{t('medium')}</Button>
                    <Button size="lg">{t('large')}</Button>
                    <Button loading>{t('loading')}</Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-accent-metallic-light">{t('secondary')}</h3>
                  <div className="space-y-2">
                    <Button variant="secondary" size="sm">{t('small')}</Button>
                    <Button variant="secondary" size="md">{t('medium')}</Button>
                    <Button variant="secondary" size="lg">{t('large')}</Button>
                    <Button variant="secondary" loading>{t('loading')}</Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-accent-metallic-light">{t('accent')}</h3>
                  <div className="space-y-2">
                    <Button variant="accent" size="sm">{t('small')}</Button>
                    <Button variant="accent" size="md">{t('medium')}</Button>
                    <Button variant="accent" size="lg">{t('large')}</Button>
                    <Button variant="accent" loading>{t('loading')}</Button>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="space-y-2">
                  <h3 className="text-accent-metallic-light">{t('outline')}</h3>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm">{t('small')}</Button>
                    <Button variant="outline" size="md">{t('medium')}</Button>
                    <Button variant="outline" size="lg">{t('large')}</Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-accent-metallic-light">{t('ghost')}</h3>
                  <div className="space-y-2">
                    <Button variant="ghost" size="sm">{t('small')}</Button>
                    <Button variant="ghost" size="md">{t('medium')}</Button>
                    <Button variant="ghost" size="lg">{t('large')}</Button>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </section>
        
        {/* Form Elements Section */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">{t('form-elements')}</h2>
          <Card>
            <Card.Body>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-accent-metallic-light">{t('input-fields')}</h3>
                  
                  <InputField 
                    label={t('default-input')}
                    placeholder={t('enter-text')}
                  />
                  
                  <InputField 
                    label={t('with-helper-text')}
                    placeholder={t('enter-text')}
                    helperText={t('helper-text-example')}
                  />
                  
                  <InputField 
                    label={t('with-error')}
                    placeholder={t('enter-text')}
                    error={t('error-message-example')}
                  />
                  
                  <InputField 
                    label={t('filled-variant')}
                    placeholder={t('enter-text')}
                    variant="filled"
                  />
                  
                  <InputField 
                    label={t('disabled')}
                    placeholder={t('enter-text')}
                    disabled
                  />
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-accent-metallic-light">{t('select-dropdown')}</h3>
                  
                  <Select 
                    label={t('default-select')}
                    options={[
                      { value: 'option1', label: t('option') + ' 1' },
                      { value: 'option2', label: t('option') + ' 2' },
                      { value: 'option3', label: t('option') + ' 3' },
                    ]}
                  />
                  
                  <Select 
                    label={t('with-helper-text')}
                    options={[
                      { value: 'option1', label: t('option') + ' 1' },
                      { value: 'option2', label: t('option') + ' 2' },
                      { value: 'option3', label: t('option') + ' 3' },
                    ]}
                    helperText={t('helper-text-example')}
                  />
                  
                  <Select 
                    label={t('with-error')}
                    options={[
                      { value: 'option1', label: t('option') + ' 1' },
                      { value: 'option2', label: t('option') + ' 2' },
                      { value: 'option3', label: t('option') + ' 3' },
                    ]}
                    error={t('error-message-example')}
                  />
                  
                  <Select 
                    label={t('disabled')}
                    options={[
                      { value: 'option1', label: t('option') + ' 1' },
                      { value: 'option2', label: t('option') + ' 2' },
                      { value: 'option3', label: t('option') + ' 3' },
                    ]}
                    disabled
                  />
                  
                  <div className="mt-6">
                    <h3 className="text-accent-metallic-light mb-4">{t('toggle-switches')}</h3>
                    
                    <div className="space-y-4">
                      <Toggle 
                        label={t('purple-toggle')}
                        checked={toggleValue}
                        onChange={() => setToggleValue(!toggleValue)}
                        variant="purple"
                      />
                      
                      <Toggle 
                        label={t('teal-toggle')}
                        checked={toggleValue}
                        onChange={() => setToggleValue(!toggleValue)}
                        variant="teal"
                      />
                      
                      <Toggle 
                        label={t('gold-toggle')}
                        checked={toggleValue}
                        onChange={() => setToggleValue(!toggleValue)}
                        variant="gold"
                      />
                      
                      <Toggle 
                        label={t('with-description')}
                        description={t('toggle-description-example')}
                        checked={toggleValue}
                        onChange={() => setToggleValue(!toggleValue)}
                      />
                      
                      <Toggle 
                        label={t('disabled')}
                        checked={toggleValue}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </section>
        
        {/* Cards Section */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">{t('cards')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <Card.Body>
                <Card.Header>
                  <Card.Title>{t('default-card')}</Card.Title>
                  <Card.Description>{t('default-card-description')}</Card.Description>
                </Card.Header>
                <p className="text-accent-metallic-light">
                  {t('card-content-description')}
                </p>
              </Card.Body>
              <Card.Footer>
                <Button size="sm">{t('action')}</Button>
              </Card.Footer>
            </Card>
            
            <Card variant="hover">
              <Card.Body>
                <Card.Header>
                  <Card.Title>{t('hover-card')}</Card.Title>
                  <Card.Description>{t('hover-card-description')}</Card.Description>
                </Card.Header>
                <p className="text-accent-metallic-light">
                  {t('hover-card-content-description')}
                </p>
              </Card.Body>
              <Card.Footer>
                <Button variant="secondary" size="sm">{t('action')}</Button>
              </Card.Footer>
            </Card>
          </div>
        </section>
        
        {/* Badges Section */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">{t('badges')}</h2>
          <Card>
            <Card.Body>
              <div className="flex flex-wrap gap-4">
                <Badge drakeVariant="default">{t('default')}</Badge>
                <Badge drakeVariant="purple">{t('purple')}</Badge>
                <Badge drakeVariant="teal">{t('teal')}</Badge>
                <Badge drakeVariant="gold">{t('gold')}</Badge>
                <Badge drakeVariant="metallic">{t('metallic')}</Badge>
              </div>
            </Card.Body>
          </Card>
        </section>
        
        {/* Loading Spinners Section */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">{t('loading-spinners')}</h2>
          <Card>
            <Card.Body>
              <div className="grid grid-cols-3 gap-8">
                <div className="flex flex-col items-center gap-2">
                  <LoadingSpinner variant="primary" size="sm" />
                  <span className="text-accent-metallic-light text-sm">{t('small')}</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <LoadingSpinner variant="primary" size="md" />
                  <span className="text-accent-metallic-light text-sm">{t('medium')}</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <LoadingSpinner variant="primary" size="lg" />
                  <span className="text-accent-metallic-light text-sm">{t('large')}</span>
                </div>
                
                <div className="flex flex-col items-center gap-2">
                  <LoadingSpinner variant="secondary" size="md" />
                  <span className="text-accent-metallic-light text-sm">{t('secondary')}</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <LoadingSpinner variant="accent" size="md" />
                  <span className="text-accent-metallic-light text-sm">{t('accent')}</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </section>
      </div>
    </div>
  );
};

export async function getServerSideProps({ locale }: GetServerSidePropsContext) {
  return {
    props: {
      ...(locale ? await serverSideTranslations(locale, ['common']) : {}),
    },
  };
}

export default BrandTestPage; 