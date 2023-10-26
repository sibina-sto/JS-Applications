export const submitHandler = callback => ev => {
  ev.preventDefault();
  callback(Object.fromEntries(new FormData(ev.target)), ev.target);
};

export const handleData = async (data, callback, id) => {
  debugger
  if (Object.values(data).some(val => val == '')) {
    return alert('Please fill all the empty fields');
  }
  try {
    if (id) {
      await callback(id, data);
    } else {
      await callback(data);
    }
  } catch (error) {
    alert(error.message);
  }
};
