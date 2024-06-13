import CountUp from 'react-countup'
const Amount = ({amount}: {amount :number}) => {
    return (
        <div className="amount-container">
            <p className='countUp'><CountUp end={amount} duration={3}/> Dt</p>

        </div>
    );
}
export default Amount