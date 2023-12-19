import { useState } from "react";
import { useAsyncDebounce } from "react-table";
import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";

export default function Filter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 300);

  return (
    <Container>
    	<Row>
    		<Col className="p-0 m-0">
    			<Form>
              <InputGroup className="bg-light mb-3">
                <Form.Control
                type="search"
                value={value || ""}
                onChange={(e) => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                  }
                }
                placeholder={`${count} records...`}
                />

                <InputGroup.Text className="bg-light">
                  <i className="bi-search"></i>
                </InputGroup.Text>

              </InputGroup>
    			</Form>
    		</Col>
    	</Row>
    </Container>
  );
}