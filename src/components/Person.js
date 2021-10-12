import React, {useState, useEffect} from "react";

// STYLES
import "../styles/person.css";

const Person = ({transaction}) => {
    const today = new Date();
    const curMonth = today.getMonth() + 1;

    const [month_1Points, setMonth_1Points] = useState(0);
    const [month_2Points, setMonth_2Points] = useState(0);
    const [month_3Points, setMonth_3Points] = useState(0);
    const [totalPoints, setTotalPoints] = useState(0);

    useEffect(() => {
        transaction.transactions.forEach((n) => {
            let month = n.date.split("/")[0];

            if (parseInt(month) === curMonth) {
                addPoints(setMonth_1Points, n);
            } else if (parseInt(month) === curMonth - 1) {
                addPoints(setMonth_2Points, n);
            } else if (parseInt(month) === curMonth - 2) {
                addPoints(setMonth_3Points, n);
            }
        });
    }, [curMonth, transaction.transactions]);

    useEffect(() => {
        setTotalPoints(() => month_1Points + month_2Points + month_3Points);
    }, [month_1Points, month_2Points, month_3Points]);

    const addPoints = (setterFunc, n) => {
        if (n.amount > 100) {
            let overHundred = Math.floor(n.amount - 100);
            setterFunc((prev) => {
                return prev + overHundred * 2;
            });
        }
        if (n.amount > 50) {
            let overFifty = Math.floor(n.amount - 50);
            setterFunc((prev) => {
                return prev + overFifty;
            });
        }
    };

    return (
        <section className="person">
            <h1>{transaction.name}</h1>

            <h3>
                Total Reward Points{" "}
                <span>{totalPoints && totalPoints} pts.</span>
            </h3>
            <div className="monthReport">
                <h4>October 2021</h4>
                <p>
                    Reward Points:{" "}
                    <span>{month_1Points && month_1Points} pts</span>
                </p>
            </div>
            <div className="monthReport">
                <h4>September 2021</h4>
                <p>
                    Reward Points:{" "}
                    <span>{month_2Points && month_2Points} pts</span>
                </p>
            </div>
            <div className="monthReport">
                <h4>August 2021</h4>
                <p>
                    Reward Points:{" "}
                    <span>{month_3Points && month_3Points} pts</span>
                </p>
            </div>
        </section>
    );
};

export default Person;
