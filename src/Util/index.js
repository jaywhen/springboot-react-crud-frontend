import moment from "moment";

export const dataValidate = (values) => {
    let data = values;
    // console.log(data);
    data.gender = data.gender.toString();
    data.department = data.department.toString();
    data.stack = data.stack.toString();
    data.joinDate = moment(data.joinDate._d).format('YYYY-MM');
    return data;
}

export const updDataValidate = values => {
    let data = values;
    data.department = [values.department];
    data.joinDate = moment(data.joinDate, 'YYYY/MM');
    data.gender = [data.gender];
    return data;
}