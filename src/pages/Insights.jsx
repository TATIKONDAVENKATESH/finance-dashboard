import Insights from "../components/dashboard/Insights";
import { useAppContext } from "../context/AppContext";

export default function InsightsPage() {
    const { transactions } = useAppContext();

    return (
        <div className="mt-2">
            <Insights data={transactions} />
        </div>
    );
}