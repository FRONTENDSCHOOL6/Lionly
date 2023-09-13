
import { useNavigate } from "react-router-dom";
import { string } from 'prop-types';

function FindAcountButton({text, destination}) {
  const navigate = useNavigate();
  return (
    <button onClick={()=>{
      navigate(destination)
    }} type="button" >{text}</button>
  )
}

FindAcountButton.propTypes = {
  text: string,
  destination: string,
};
export default FindAcountButton;