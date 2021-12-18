import * as yup from 'yup';

const schema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .required('Name is required')
        .min(3, 'Name must be 3 characters long'),
    extra: yup
        .string()
        .trim(),
    size: yup
    .string()
    .trim(),
    pepperoni: yup.boolean(),
    sausage: yup.boolean(),
    cheese: yup.boolean(),
    chicken: yup.boolean()
})

export default schema;