const calcData = [
  { id: "clear", value: "AC" },
  { id: "divide", value: "/" },
  { id: "multiply", value: "x" },
  { id: "seven", value: 7 },
  { id: "eight", value: 8 },
  { id: "nine", value: 9 },
  { id: "subtract", value: "-" },
  { id: "four", value: 4 },
  { id: "five", value: 5 },
  { id: "six", value: 6 },
  { id: "add", value: "+" },
  { id: "one", value: 1 },
  { id: "two", value: 2 },
  { id: "three", value: 3 },
  { id: "equals", value: "=" },
  { id: "zero", value: 0 },
  { id: "decimal", value: "." },
];

const operators = ["AC", "/", "x", "+", "-", "="];

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const Display = ({ input, output }) => (
  <div className="output">
    <span className="result">{output}</span>
    <span id="display" className="input">
      {input}
    </span>
  </div>
);

// returns button. keyData is sent from Keyboard func below
const Key = ({ keyData: { id, value }, handleInput }) => (
  <button id={id} onClick={() => handleInput(value)}>
    {value}
  </button>
);

const Keyboard = ({ handleInput }) => (
  <div className="keys">
    {calcData.map((key) => (
      <Key key={key.id} keyData={key} handleInput={handleInput} />
    ))}
  </div>
);

const App = () => {
  const [input, setInput] = React.useState("0");
  const [output, setOutput] = React.useState("");
  const [calculatorData, setCalculatorData] = React.useState("");

  const handleSubmit = () => {
    console.log("handleSubmit", calculatorData);
    const total = eval(calculatorData);
    setInput(`${total}`)
    setOutput(`${total}`);
    setCalculatorData(`${total}`);
  };

  const handleClear = () => {
    setInput("0")
    setOutput("");
    setCalculatorData("");
  };


  const handleNumbers = (value) => {
    // if calculator.length is empty
    if (!calculatorData.length) {
      setInput(`${value}`);
      setCalculatorData(`${value}`);
    } else {
      // prevent inputing more than 1 initial 0
      if (value === 0 && (calculatorData === "0" || input === "0")) {
        // sets current data
        setCalculatorData(`$calculatorData`);
      } else {
        // selects last character
        const lastChar = calculatorData.charAt(calculatorData.length - 1);
        // set if last character is an operater
        const isLastCharOperator =
          lastChar === "*" || operators.includes(lastChar);

        // sets the operator(if exists) as the input or adds the value onto the existing input
        setInput(isLastCharOperator ? `${value}` : `${input}${value}`);
        // updates the calculatorData with the new value input
        setCalculatorData(`${calculatorData}${value}`);
      }
    }
  };

  const dotOperator = () => {
    const lastChar = calculatorData.charAt(calculatorData.length - 1);
    // if there is no number input before pressing "."
    if (!calculatorData.length) {
      setInput("0.");
      setCalculatorData("0.");
    } else {
      // if last character is an operator
      if (lastChar === "*" || operators.includes(lastChar)) {
        setInput("0.");
        // adds initial value of data and "0."
        setCalculatorData(`${calculatorData} 0.`);
      } else {
        // if last character is or includes "." then it returns the initial value ro prevent multiple "."
        setInput(
          lastChar === "." || input.includes(".") ? `${input}` : `${input}.`
        );
        const formattedValue =
          lastChar === "." || input.includes(".")
            ? `${calculatorData}`
            : `${calculatorData}.`;
        setCalculatorData(formattedValue);
      }
    }
  };

  const handleOperator = (value) => {
    // if there is a value
    if (calculatorData.length) {
      setInput(`${value}`);
      const beforeLastChar = calculatorData.charAt(calculatorData.length - 2);

      // sets if second last charater is operator
      const beforeLastCharIsOperator =
        operators.includes(beforeLastChar) || beforeLastChar === "*";

      const lastchar = calculatorData.charAt(calculatorData.length - 1);

      const lastcharIsOperator =
        operators.includes(lastchar) || lastchar === "*";

      // sets * if value is x 
      const validOp = value === "x" ? "*" : value;
      if (
        // allow minus number after operator 
        (lastcharIsOperator && value !== "-") ||
        (beforeLastCharIsOperator && lastcharIsOperator)
      ) {
        //  if previous character is an operator (& not "-") create updatedValue
        if (beforeLastCharIsOperator) {
          // get the data before the operator (before the last two charactors)
          const updatedValue = `${calculatorData.substring(
            0,
            calculatorData.length - 2
          )}${value}`;
          setCalculatorData(updatedValue);
        } else {
          // changes the last character with the new operator
          setCalculatorData(
            `${calculatorData.substring(
              0,
              calculatorData.length - 1
            )}${validOp}`
          );
        }
      } else {
        // if no special case add operator to the data
        setCalculatorData(`${calculatorData}${validOp}`);
      }
    }
  };

  const handleInput = (value) => {
    const number = numbers.find((num) => num === value);
    const operator = operators.find((op) => op === value);

    switch (value) {
      case "=":
        handleSubmit();
        break;
      case "AC":
        handleClear();
        break;
      case number:
        handleNumbers(value);
        break;
      case ".":
        dotOperator(value);
        break;
      case operator:
        handleOperator(value);
        break;
      default:
        break;
    }
  };

  const handleOutput = () => {
    setOutput(calculatorData);
    
  };

  // calls handleOutput everytime calculatorData is updated
  React.useEffect(() => {
    handleOutput();
  }, [calculatorData]);

  return (
    <div className="container">
      <div className="calculator">
        <div>
          <Display input={input} output={output} />
          <Keyboard handleInput={handleInput} />
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
