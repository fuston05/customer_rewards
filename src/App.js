import React, {useState, useEffect} from "react";

// STYLES
import "./styles/app.css";

// COMPONENTS
import Person from "./components/Person";
import Loader from "./components/Loader";

// DATA
import {transactionsData} from "./data";

function App() {
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const fakeAsync = setTimeout(() => {
            setTransactions(transactionsData);
            setIsLoading(false);
        }, 3000);
        return () => {
            window.clearTimeout(fakeAsync);
        };
    }, []);

    return (
        <div className="App">
            <h1>Customer Rewards Program</h1>
            {isLoading && <Loader text="Loading..." />}

            {transactions &&
                !isLoading &&
                transactions.map((t) => {
                    return (
                        <Person
                            key={Math.random() * Date.now()}
                            transaction={t}
                        />
                    );
                })}
        </div>
    );
}

export default App;
