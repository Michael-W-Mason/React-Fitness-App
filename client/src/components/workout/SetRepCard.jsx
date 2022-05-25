

const SetRepCard = props => {
    return(
        <ol>
            {props.workout.steps.map((ele, i) => {
                return(
                    <li key={i} className="font-normal">{`${ele.movement} - ${ele.sets} Sets x ${ele.reps} Reps`}</li>
                );
            })}
        </ol>
    );
}

export default SetRepCard;