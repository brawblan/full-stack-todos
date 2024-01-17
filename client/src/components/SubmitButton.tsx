import { FormInstance, Form, Button } from 'antd';
import { useState, useEffect } from 'react';

export const SubmitButton = ({ form }: { form: FormInstance; }) => {
  const [submittable, setSubmittable] = useState(false);

  const values = Form.useWatch([], form);

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      },
    );
  }, [values]);

  return (
    <Button type="primary" htmlType="submit" disabled={!submittable}>
      Create account
    </Button>
  );
};