import { FC, useEffect } from "react";
import { Form, Row, Col, Input, message } from "antd";
import Button from "@src/modules/shared/components/Button/Button";
import { useUpdateCreatorMutation, useCreatorQuery } from "../../service/creatorApi";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "@src/modules/shared/components/Spinner/Spinner";

interface AddCreatorFormProps {
  onFinish: (values: any) => void;
}

const AddCreatorForm: FC<AddCreatorFormProps> = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm();
  const { id } = useParams<{ id: string }>(); // Assuming useParams returns an object with 'id' property
  const { data: fetchCreator, isLoading, refetch } = useCreatorQuery(id); // Add refetch function
  const [updatecreator] = useUpdateCreatorMutation();

  useEffect(() => {
    if (fetchCreator) {
      form.setFieldsValue({
        name: fetchCreator?.data?.name
      });
    }
  }, [fetchCreator, form]);

  if (isLoading) return <Spinner />;

  const handleSaveClick = async () => {
    try {
      const values = await form.validateFields(); 
      const objectPost = { ...values };
      
      // Update creator
      const response = await updatecreator({
        id,
        data:{
          name: objectPost.name,
        }
      });
      if ('data' in response) {
        // Display success message if data exists
        message.success("Creator saved successfully!");
        navigate("/authors")
        
    } else if ('error' in response) {
        // Display error message if error exists
        message.error("Failed to save Creator. Please try again.");
        console.error('Error saving Creator', response.error);
    } else {
        // Handle unexpected response format
        message.error("Unexpected response from server. Please try again later.");
    }

      // Reset form fields and validation status
     
      
      // Refetch creator data to reflect changes
      refetch();

    } catch (error) {
      console.error('Error saving creator', error);
      }
  };

  return (
    <div className="add-new-Product">
      <h1 className="title">Add New Creator</h1>
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
                      message: 'Please enter Store name' 
                  },
                  {
                      pattern: /^(?!\s)(?=(?:.*[a-zA-Z\u0600-\u06FF]){2})[a-zA-Z\u0600-\u06FF\s]{2,}$/,
                      message: 'Name must contain at least two alphabetical characters and no leading spaces'
                  }
              ]}                          >
                <Input size="large" placeholder="Name" className="input-custom" />
              </Form.Item>
            </Col>
          </Row>
          
      
        
          <Form.Item>
            <Button type="submit" className="add-cat" onClick={handleSaveClick}>Save Creator</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddCreatorForm;
