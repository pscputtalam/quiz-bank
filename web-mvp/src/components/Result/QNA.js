import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';

const urlPattern = new RegExp('^(https?:\\/\\/)?'+
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
  '((\\d{1,3}\\.){3}\\d{1,3}))'+
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
  '(\\?[;&a-z\\d%_.~+=-]*)?'+
  '(\\#[-a-z\\d_]*)?$','i');

const isUrl = string => urlPattern.test(string);

const QNA = ({ questionsAndAnswers }) => {
  return (
    <Table celled striped selectable size="large">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>No.</Table.HeaderCell>
          <Table.HeaderCell>Questions</Table.HeaderCell>
          <Table.HeaderCell>Your Answers</Table.HeaderCell>
          <Table.HeaderCell>Correct Answers</Table.HeaderCell>
          <Table.HeaderCell>Points</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {questionsAndAnswers.map((item, i) => (
          <Table.Row key={i + 1}>
            <Table.Cell>{i + 1}</Table.Cell>
            <Table.Cell>{item.question}</Table.Cell>
            <Table.Cell>
              {isUrl(item.user_answer) ? (
                <img src={item.user_answer} alt="user answer" style={{ width: '100px', height: '100px' }} />
              ) : (
                item.user_answer
              )}
            </Table.Cell>
            <Table.Cell>
              {isUrl(item.correct_answer) ? (
                <img src={item.correct_answer} alt="correct answer" style={{ width: '100px', height: '100px' }} />
              ) : (
                item.correct_answer
              )}
            </Table.Cell>
            <Table.Cell>{item.point}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

QNA.propTypes = {
  questionsAndAnswers: PropTypes.array.isRequired,
};

export default QNA;
