import {App} from "jovo-framework";

import {ParserService} from "./logic/parser";

export const app = new App({
    logging: true,
});

let parserService = new ParserService();
parserService.init().then(() => {
    app.setHandler({
        'LAUNCH': function() {
            this.ask('Welcome to Clariba Genie! What do you want to know?',
                'Please perform a query to Clariba Genie!');
        },
        'QueryIntent': function() {
            let question = this.getInput('UserInput').value;
            parserService.parse(question).then(result => {
                console.log(result);
                this.tell(result.response.spoken);
            });
        }
    });
});

