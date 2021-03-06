import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import logo from './logo.svg';
import { config } from './config';
import { Timeline } from './Timeline';
import { TimeEvent } from './TimeEvent';
import { Summary } from './Summary';
import { Tags } from './Tags';
import { TutorialOverlay } from './TutorialOverlay';
import { MobileOverlay } from './MobileOverlay';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './App.css';

const timeline = <Timeline />
const startingState = {
    config: config,
    minYear: 1970,
    maxYear: 2018,
    years: [],
    taggedYears: [],
    matches: [],
    type: 'all',
    category: 'all',
    pub: config.pubs.length,
    initialLoad: true,
    aboutVisible: false,
    tutorialVisible: true,
};

const time1 = new TimeEvent({ id: 'sup', children: 'I have content' });
time1.render();

class App extends Component {

    constructor() {
        super();
        this.state = startingState;
        this.state.items = [ this.state.pub ];
        this.filter = this.filter.bind( this );
        this.selectType = this.selectType.bind( this );
        this.selectCategory = this.selectCategory.bind( this );
        this.getSummary = this.getSummary.bind( this );
        this.showAbout = this.showAbout.bind( this );
        this.hideTutorial = this.hideTutorial.bind( this );
    }
    filter() {
        const { pubs } = config;
        const { type, category } = this.state;
        pubs.map (( pub ) => {
            if ((  pub.type == type || type === 'all' ) &&
            ( pub.category == category || category === 'all' )) {
                pub.match = true;
            }
            else {
                pub.match = false;
            }
        });
        return pubs;
    }
    selectType( tag ) {
        this.setState({ type: tag });
    }
    showAbout() {
        this.setState({ aboutVisible: !this.state.aboutVisible });
        console.log(this.state);
    }
    hideTutorial() {
        this.setState({ tutorialVisible: false });
        console.log(this.state);
    }
    selectCategory( tag ) {
        this.setState({ category: tag });
        console.log(this.state.category);
    }
    getSummary( id ) {
        this.setState({ pub: id, initialLoad: false });
    }
    render() {
        const items = [
            <Summary key={this.state.pub} pub={this.state.config.pubs[this.state.pub -1 ]} setState={this.setState} state={this.state} />
        ];
        return (
            <div id="container">
                <Tags type={this.state.type} state={this.state} category={this.state.category} showAbout={this.showAbout} aboutVisible={this.state.aboutVisible} selectCategory={this.selectCategory} setState={this.setState} selectType={this.selectType} filter={this.filter} />
                <Timeline matches={this.filter()} state={this.state} getSummary={this.getSummary} />
                <ReactCSSTransitionGroup
                    transitionName={ {
                        enter: 'enter',
                        leave: 'peace',
                        appear: 'appear'
                      } }
                    transitionEnterTimeout={1500}
                    transitionLeave = {true}
                    transitionLeaveTimeout={1500}>
                    {items}
                </ReactCSSTransitionGroup>
                <TutorialOverlay state={this.state} hideTutorial={this.hideTutorial} />
                <MobileOverlay />
            </div>
        );
    }
}

export default App;
