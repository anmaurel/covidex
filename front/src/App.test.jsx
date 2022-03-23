import React from "react";
import { configure, shallow } from "enzyme";
import App from "./App";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Card, ListGroup } from "react-bootstrap";
import EditIcon from "@material-ui/icons/Edit";
import CancelIcon from "@material-ui/icons/Cancel";
import DeleteIcon from "@material-ui/icons/Delete";

configure({ adapter: new Adapter() });

describe("Check list of variants", () => {
  const app = shallow(<App />);
  const variants = [
    {
      id: 1,
      name: "Variant Nigérian",
      text: "desc",
      onset_date: "aout 2020",
    },
    {
      id: 2,
      name: "Variant Britannique",
      text: "desc",
      onset_date: "octobre 2020",
    },
    {
      id: 3,
      name: "Variant Danois",
      text: "desc",
      onset_date: "novembre 2020",
    },
    {
      id: 4,
      name: "Variant Sud-Africain",
      text: "desc",
      onset_date: "décembre 2020",
    },
    {
      id: 5,
      name: "Variant Brésilien",
      text: "desc",
      onset_date: "janvier 2021",
    },
    {
      id: 6,
      name: "Variant P1",
      text: "desc",
      onset_date: "décembre 2020",
    },
    {
      id: 7,
      name: "Variant 20A EU.1",
      text: "desc",
      onset_date: "octobre 2020",
    },
    {
      id: 8,
      name: "Variant Californien",
      text: "desc",
      onset_date: "juillet 2020",
    },
    {
      id: 9,
      name: "Variant New-Yorkais",
      text: "desc",
      onset_date: "novembre 2020",
    },
    {
      id: 10,
      name: "Variant Breton",
      text: "desc",
      onset_date: "mars 2021",
    },
    {
      id: 11,
      name: "Variant Philippin",
      text: "desc",
      onset_date: "mars 2021",
    },
    {
      id: 12,
      name: "Variant Henri-Mondor",
      text: "desc",
      onset_date: "février 2021",
    },
    {
      id: 13,
      name: "Variant Indien",
      text: "desc",
      onset_date: "octobre 2020",
    },
  ];

  test("List should display all variants", () => {
    app.setState({
      variants: variants,
    });

    expect(app.find(ListGroup.Item)).toHaveLength(variants.length);
  });

  test("Clicking on a variant display it's card", () => {
    app.find(ListGroup.Item).at(0).simulate("click");
    expect(app.find(Card.Title).at(0).text()).toBe(variants[0].name);
  });

  test("Clicking on edit should change form state", () => {
    app.find(EditIcon).at(0).simulate("click");
    expect(app.find(Card.Title).at(1).text()).toBe(
      `Edition de ${variants[0].name}, id:${variants[0].id}`
    );
  });

  test("Clicking on exit edit should change form state to new", () => {
    app.find(CancelIcon).at(0).simulate("click");
    expect(app.find(Card.Title).at(1).text()).toBe(`Nouveau Variant`);
  });

  test("Clicking on delete should call deleteVariant", () => {
    const deleteVariant = jest.spyOn(app.instance(), "deleteVariant");
    app.find(DeleteIcon).at(0).simulate("click");
    expect(deleteVariant).toHaveBeenCalledWith(variants[0].id);
  });
});
