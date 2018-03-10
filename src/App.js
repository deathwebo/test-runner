import React, { Component } from 'react';
import './App.css';

const NOT_STARTED_YET = 'Not Started Yet';
const RUNNING = 'Running';
const PASSED = 'Passed';
const FAILED = 'Failed';

class App extends Component {
  constructor(props) {
    super(props);

    const tests = props.tests.map(test => ({
      description: test.description,
      run: test.run,
      status: NOT_STARTED_YET,
    }));

    this.state = {
      tests,
    };

    this.startTests = this.startTests.bind(this);
  }

  startTests() {
    this.state.tests.forEach((test, idx) => {
      const tests = this.state.tests;
      tests[idx].status = RUNNING;

      tests[idx].run((testPassed) => {
        const status = testPassed ? PASSED : FAILED;
        tests[idx].status = status;
        this.setState({ tests });
      });

      this.setState({ tests });
    });
  }

  renderTestListItem(test, idx, statusColor) {
    return (
      <li key={idx}>
        <span className="has-text-weight-bold is-capitalized">{test.description}: </span>
        <span className={statusColor}>{test.status}</span>
      </li>
    );
  }

  render() {
    const notStartedTests = this.state.tests.filter(test => test.status === NOT_STARTED_YET);
    const runningTests = this.state.tests.filter(test => test.status === RUNNING); 
    const passedTests = this.state.tests.filter(test => test.status === PASSED); 
    const failedTests = this.state.tests.filter(test => test.status === FAILED); 

    let finishedNotice = null;

    if (this.state.tests.length === (passedTests.length + failedTests.length)) {
      finishedNotice = (<p className="has-text-info is-size-3">FINISHED!</p>);
    }

    return (
      <section className="section">
        <div className="App container">
          <h1 className="title">Test Runner</h1>
          <h2 className="subtitle">Click the run tests button to start with the execution of all tests</h2>

          <button 
            type="button" 
            className="button is-large is-primary"
            onClick={this.startTests}
          >Run tests</button>

          <section className="section">
            <div className="columns">
              <div className="column is-half">
                <ul>
                  {notStartedTests.map((test, idx) => this.renderTestListItem(test, idx, 'has-text-gray'))}
                  {runningTests.map((test, idx) => this.renderTestListItem(test, idx, 'has-text-warning'))}
                  {passedTests.map((test, idx) => this.renderTestListItem(test, idx, 'has-text-success'))}
                  {failedTests.map((test, idx) => this.renderTestListItem(test, idx, 'has-text-danger'))}
                </ul>
              </div>
              <div className="column is-half">
                {finishedNotice}
                <p className="has-text-success is-size-4">Total passed: {passedTests.length}</p>
                <p className="has-text-danger is-size-4">Total failed: {failedTests.length}</p>
                <p className="has-text-warning is-size-4">Total running: {runningTests.length}</p>
              </div>
            </div>
          </section>
        </div>
      </section>
    );
  }
}

export default App;
