import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import { getConfirmTicket } from '../reducks/users/selectors'
import Ticket from '../components/organisms/Ticket';
import Grid from "@material-ui/core/Grid";
import { Button } from "../components/atoms";
import { bookTicket } from '../reducks/users/operations';
import { TextInput } from '../components/atoms';
import { getUsername } from "../reducks/users/selectors";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 100
  }
}));

const Confirm = () => {
  const classes = useStyles();
  const selector = useSelector((state) => state);
  const confirmTicket = getConfirmTicket(selector);
  const dispatch = useDispatch();
  const username = getUsername(selector);

  const [ticket, setTicket] = useState(confirmTicket);
  const [passenger, setPassenger] = useState(username);

  useEffect(() => {
    ticket.passenger = passenger;
  }, [passenger])

  const changePassengerName = (props) => {
    setPassenger(props);
  }

  const _bookTicket = (ticket) => {
    dispatch(bookTicket(ticket));
  }

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12} className={classes.searchBar}>
          </Grid>
          <Grid item xs={12} md={2}>
          </Grid>
          <Grid item xs={12} md={7}>
            {Object.keys(confirmTicket).length > 0 && <Ticket
              id={confirmTicket.id}
              price={confirmTicket.price}
              currencies={confirmTicket.currencies}
              direct={confirmTicket.Direct}
              departAirportCode={confirmTicket.departAirportCode}
              arriveAirportCode={confirmTicket.arriveAirportCode}
              departAirportName={confirmTicket.departAirportName}
              arriveAirportName={confirmTicket.arriveAirportName}
              outboundCarriers={confirmTicket.outboundCarriers}
              inboundCarriers={confirmTicket.inboundCarriers}
              outboundCarriersLogo={confirmTicket.outboundCarriersLogo}
              inboundCarriersLogo={confirmTicket.inboundCarriersLogo}
              outboundDepartureDate={confirmTicket.outboundDepartureDate}
              inboundDepartureDate={confirmTicket.inboundDepartureDate}
            />}
            <TextInput
              label={'Passenger Name'}
              defaultValue={username}
              required={true}
              onChange={changePassengerName}
            />
          </Grid>
          <Grid item xs={12} md={3}>
          <Button
            onClick={() => _bookTicket(ticket)}
            label={"Book"}
            color={"primary"}
          />
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export default Confirm