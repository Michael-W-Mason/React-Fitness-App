

const SetRepCard = props => {
    return(
        <div>
            <h2 className="text-base text-gray-900">{`Sets and Reps:`}</h2>
            <ol>
                {props.workout.steps.map((ele, i) => {
                    return(
                        <li key={i} className="font-normal">{`${ele.movement} - ${ele.sets} Sets x ${ele.reps} Reps`}</li>
                    );
                })}
            </ol>
        </div>
    );
}

export default SetRepCard;