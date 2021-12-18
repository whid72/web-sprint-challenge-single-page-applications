import React, { useEffect, useState } from "react";
import { Route } from 'react-router-dom';
import Form from "./Pizza";
import Home from "./Home";
import Order from "./Order";
import * as yup from 'yup';
import schema from './validation/schema';
import axios from "axios";


const url = 'http://localhost:3000'

const initialFormValues = {
  ///// TEXT INPUTS /////
  name: '',
  extra: '',
  ///// DROPDOWN /////
  size: '',
  ///// RADIO BUTTONS /////
  // civil: '',
  ///// CHECKBOXES /////
  pepperoni: false,
  sausage: false,
  cheese: false,
  chicken: false,
}

const initialFormErrors = {
  ///// TEXT INPUTS /////
  name: '',
  extra: '',
  ///// DROPDOWN /////
  size: '',
}

const initialData = [];
const initialDisabled = true

const App = () => {

  const [data, setData] = useState(initialData)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)

  const validate = (name, value) => {
    yup.reach(schema, name).validate(value)
      .then(() => setFormErrors({ ...formErrors, [name]: '' }))
      .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0] }))
  }

  useEffect(() => {
    schema.isValid(formValues).then(valid => setDisabled(!valid));
  }, [formValues])

  const inputChange = (name, value) => {
    //validation with yup
    validate(name, value);
    setFormValues({
      ...formValues,
      [name]: value // NOT AN ARRAY
    })
  }

  const postNewData = newData => {
    axios.post(url, newData)
      .then(res => {
        setData([res.data, ...data]);
        console.log(res)
      })
      .catch(err => console.error(err))
      .finally(() => {
        setFormValues(initialFormValues);
      })
  }

  const formSubmit = () => {
    const newData = {
      name: formValues.name.trim(),
      extra: formValues.extra.trim(),
      size: formValues.password,
      toppings: ['pepperoni', 'sausage', 'cheese', 'chicken'].filter(topping => !!formValues[topping])
    }
    postNewData(newData);
  }

  return (
    <>
      <h1>Lambda Eats</h1>
      <p>You can remove this code and create your own header</p>

      <Route path="/" >
      <Home />
      </Route>
      <Route path="/pizza" >
      <Form
        values={formValues}
        disabled={disabled}
        errors={formErrors}
        change={inputChange}
        submit={formSubmit} />

      {
        data.map(order => {
          return (
            <Order key={order.id} details={order} />
          )
        })
      }
      </Route>
    </>

  );
};
export default App;
