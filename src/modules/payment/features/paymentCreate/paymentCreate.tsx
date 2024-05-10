import { FC } from "react";
import { Form, Row, Col, Input, message } from "antd";
import Button from "@src/modules/shared/components/Button/Button";
import { useCreatePaymentMutation } from "../../service/paymentApi";
import { useNavigate } from "react-router-dom";

interface AddPaymentFormProps {
  onFinish: (values: any) => void;
}

const AddPaymentForm: FC<AddPaymentFormProps> = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [createPayment] = useCreatePaymentMutation();
  const handleSaveClick = async () => {
    try {
      const values = await form.validateFields(); // Validate form fields
      const objectPost = { ...values };

      // Create category
      const response = await createPayment({
        name: objectPost.name,
      });
      if ("data" in response) {
        // Display success message if data exists
        message.success("Payment saved successfully!");
        form.resetFields();

        navigate("/Payments");
      } else if ("error" in response) {
        // Display error message if error exists
        message.error("Failed to save Payment. Please try again.");
        console.error("Error saving Payment", response.error);
      } else {
        // Handle unexpected response format
        message.error(
          "Unexpected response from server. Please try again later.",
        );
      }
    } catch (error) {
      console.error("Error saving Payment", error);
      message.error("Error saving Payment");
    }
  };

  return (
    <div className="add-new-Product">
      <h1 className="title">Add New Payment</h1>
      <div className="container-add-Product">
        <Form form={form}>
          <Row gutter={[16, 0]} className="name-Product">
            <Col span={22}>
              <Form.Item
                name="name"
                style={{ marginBottom: 0 }}
                rules={[
                  {
                    required: true,
                    message: "Please enter Store name",
                  },
                  {
                    pattern:
                      /^(?!\s)(?=(?:.*[a-zA-Z\u0600-\u06FF]){2})[a-zA-Z\u0600-\u06FF\s]{2,}$/,
                    message:
                      "Name must contain at least two alphabetical characters and no leading spaces",
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Name"
                  className="input-custom"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="submit" className="add-cat" onClick={handleSaveClick}>
              Save Payment
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddPaymentForm;
