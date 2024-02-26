// @ts-nocheck


import Container from "../components/Container";
import FormWrap from "../components/FormWrap";
import CheckOutClient from '../checkout/CheckOutClient';
import { getCurrentUser } from "@/actions/getCurrentUser";

const CheckOut = async () => {

  const currentUser = await getCurrentUser();

  return (
    <div className="p-8">
      <Container>
        <FormWrap>
          <CheckOutClient currentUser={currentUser} />
        </FormWrap>
      </Container>
    </div>
  );
};



export default CheckOut;
