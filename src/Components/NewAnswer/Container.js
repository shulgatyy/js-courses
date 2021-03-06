import { withInputs, shouldRender } from 'custom-hoc';
import { withRouter } from 'react-router';
import { compose, withHandlers } from 'recompose';
import { db, withUser } from '../../utils';
import Component from './Component';


const enhance = compose(
  withUser,
  shouldRender(props => props.user),
  withInputs({
    answer: {
      validate: value => value.length > 0,
    },
  }),
  withRouter,
  withHandlers({
    onSubmit: ({ answer, submitReady, match, user, onClear }) => () => {
      if (user && submitReady) {
        db.answers.insert({
          title: answer,
          createdAt: new Date(),
          createdById: user._id,
          questionId: match.params.questionId,
          description: '',
        });

        onClear();
      }
    }
  })
);


export default enhance(Component)