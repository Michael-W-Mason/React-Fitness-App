

const CircuitCard = props => {
    return(
        <div>
            <h2 className="text-base text-orange-400">{`${props.workout.rounds} Rounds`}</h2>
            <ol>
                {props.workout.steps.map((ele, i) => {
                    return(
                        <li key={i} className="font-normal">{`${ele.movement} - ${ele.reps} for ${ele.units}`}</li>
                    );
                })}
            </ol>
        </div>
    );
}

export default CircuitCard;