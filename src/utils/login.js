const saveUser = async (user) => {
  const {username} = user
  try {
    console.log("Sesion iniciada!")
		return username;
  } catch (error) {
		console.log(error);
	}
}

module.exports = { saveUser }