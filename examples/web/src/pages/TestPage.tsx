import { Card } from "antd"
import { useTranslation } from 'ez-console'


export const TestPage: React.FC = () => {
  const { i18n } = useTranslation();

  return <Card title={i18n.t('common.testPage', { defaultValue: 'Test Page' })}>
    <div>Test Page</div>
    <div>{i18n.t('common.testPage', { defaultValue: 'Test Page' })}</div>
  </Card>
}

export default TestPage;