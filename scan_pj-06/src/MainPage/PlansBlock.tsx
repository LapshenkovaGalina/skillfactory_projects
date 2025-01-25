import './PlansBlock.css'
import Plan, { PlanInfoType } from './Plan';

function PlansBlock({ plans }: { plans: Array<PlanInfoType> }) {
    function plansGenerator(plansInfo: Array<PlanInfoType>) {
        return (
            plansInfo.map((planInfoObj, ind) =>
                <Plan key={ind} planInfo={planInfoObj} />
            )
        )
    }

    return (
        <div className='PlansBlock'>
            {plansGenerator(plans)}
        </div>
    )
}

export default PlansBlock;