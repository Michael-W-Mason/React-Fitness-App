

const CircuitCard = props => {
    return(
        <div>
            <h2 className="text-base text-gray-900">{`Circuit: ${props.workout.rounds} Rounds`}</h2>
            <ol>
                {props.workout.steps.map((ele, i) => {
                    return(
                        <li key={i} className="font-normal">{`${ele.movement} - ${ele.reps} ${ele.units}`}</li>
                    );
                })}
            </ol>
        </div>
    );
}

export default CircuitCard;