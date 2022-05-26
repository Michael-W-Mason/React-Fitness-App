

const TimeDistCard = props => {
    return(
        <div>
            <h2 className="text-base text-gray-900">{`Time / Distance:`}</h2>
            <h2 className="font-normal">{`${props.workout.movement} for ${props.workout.duration} ${props.workout.units}`}</h2>
        </div>
    );
}

export default TimeDistCard;