import axios from "axios";
import React from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
} from "react-bootstrap";
import { ReactComponent as Loader } from "./icons/circles.svg";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CancelIcon from "@material-ui/icons/Cancel";

interface Variant {
  id: number;
  name: string;
  text: string;
  onset_date: string;
}

interface IOwnState {
  variants: Variant[];
  selectedVariantID?: number;
  inputName: string;
  inputText: string;
  inputDate: string;
  editVariant?: Variant;
}

class App extends React.Component<{}, IOwnState> {
  state = {
    variants: [] as Variant[],
    selectedVariantID: undefined as undefined | number,
    inputName: "",
    inputText: "",
    inputDate: "",
    editVariant: undefined as undefined | Variant,
  };

  componentDidMount() {
    this.getVariants();
  }

  getVariants = async () => {
    try {
      const response = await axios.get("http://localhost:9000/variants");
      const variants: Variant[] = response.data;
      if (variants.length > 0) {
        if (this.state.variants.length === 0) {
          this.setState({
            variants: variants,
            selectedVariantID: variants[0].id,
          });
        } else {
          this.setState({
            variants: variants,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  deleteVariant = async (id: number) => {
    try {
      await axios.delete(`http://localhost:9000/variant/delete/${id}`);
      this.getVariants();
    } catch (error) {
      console.log(error);
    }
  };

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let name = this.state.inputName;
    let text = this.state.inputText;
    let date = this.state.inputDate;
    try {
      if (this.state.editVariant) {
        await axios.put(
          `http://localhost:9000/variant/update/${this.state.editVariant.id}`,
          {
            name: name,
            text: text,
            onset_date: date,
          }
        );
        this.setState({ editVariant: undefined });
      } else {
        await axios.post(`http://localhost:9000/variant/add`, {
          name: name,
          text: text,
          onset_date: date,
        });
      }
      this.getVariants();
      this.setState({ inputDate: "", inputName: "", inputText: "" });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const selectedVariant = this.state.variants.find(
      (variant) => variant.id === this.state.selectedVariantID
    );
    return (
      <Container>
        <Row className="mt-5">
          <Col sm={12} md={4}>
            <ListGroup>
              {this.state.variants.length > 0 ? (
                <>
                  {this.state.variants.map((variant) => {
                    return (
                      <ListGroup.Item
                        key={
                          variant.id +
                          variant.name +
                          variant.text +
                          variant.text
                        }
                        style={{ cursor: "pointer" }}
                        className="d-flex justify-content-between"
                        onClick={() => {
                          this.setState({ selectedVariantID: variant.id });
                        }}
                      >
                        {variant.name}
                        <div>
                          <EditIcon
                            onClick={() => {
                              this.setState({ editVariant: variant });
                            }}
                          />
                          <DeleteIcon
                            className="ml-3"
                            onClick={() => {
                              this.deleteVariant(variant.id);
                            }}
                          />
                        </div>
                      </ListGroup.Item>
                    );
                  })}
                </>
              ) : (
                <Loader />
              )}
            </ListGroup>
          </Col>
          <Col sm={12} md={8}>
            <div className="sticky-top d-flex flex-column align-items-stretch">
              {selectedVariant && (
                <Card>
                  <Card.Body>
                    <Card.Title>{selectedVariant.name}</Card.Title>
                    <Card.Text>{selectedVariant.text}</Card.Text>
                    <Card.Subtitle className="mb-2 text-muted">
                      {selectedVariant.onset_date}
                    </Card.Subtitle>
                  </Card.Body>
                </Card>
              )}
              <Card className="mt-3">
                <Card.Body>
                  {this.state.editVariant ? (
                    <Card.Title>
                      Edition de{" "}
                      {this.state.editVariant.name +
                        ", id:" +
                        this.state.editVariant.id}
                      <CancelIcon
                        className="ml-3"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          this.setState({ editVariant: undefined });
                        }}
                      />
                    </Card.Title>
                  ) : (
                    <Card.Title>Nouveau Variant</Card.Title>
                  )}
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="name">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Name"
                        value={this.state.inputName}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          this.setState({ inputName: event.target.value });
                        }}
                      />
                    </Form.Group>
                    <Form.Group controlId="text">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Description"
                        value={this.state.inputText}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          this.setState({ inputText: event.target.value });
                        }}
                      />
                    </Form.Group>
                    <Form.Group controlId="date">
                      <Form.Label>Date</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Date (mois AAAA)"
                        value={this.state.inputDate}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          this.setState({ inputDate: event.target.value });
                        }}
                      />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
