const UpdAtt = "UPDATE sunday_service SET nursery = ?, pre_school = ?, kinder = ?, early_elementary = ?, late_elementary = ? WHERE event_id = ?"
const Register = "INSERT INTO user (user_email, user_password, user_firstname, user_lastname, user_status, user_id) VALUES (?,?,?,?,?, uuid())"
const Login = "SELECT * FROM user WHERE user_email = ? "
const AddEvent = "INSERT INTO sunday_service (event_id, event_name, date) VALUES (uuid(),?,?)";
const EventDisplay = "SELECT * FROM sunday_service"
const DeleteEvent = "DELETE FROM sunday_service WHERE event_id = ?"



module.exports = { UpdAtt, Register, Login, AddEvent, EventDisplay, DeleteEvent }