import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  Segment,
  Item,
  Divider,
  Button,
  Icon,
  Message,
  Menu,
  Header,
} from 'semantic-ui-react'

// markdown and katex support
import Markdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'

import Countdown from '../Countdown'

const Quiz = ({ data, countdownTime, endQuiz }) => {
  const [questionIndex, setQuestionIndex] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [userSlectedAns, setUserSlectedAns] = useState(null)
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState([])
  const [timeTaken, setTimeTaken] = useState(null)
 //const [tempImageUrl] = useState('https://res.cloudinary.com/dsntr0b70/image/upload/v1710988583/physics/q15a1_f6ssij.jpg')

  useEffect(() => {
    if (questionIndex > 0) window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [questionIndex])

  const handleItemClick = (e, { name }) => {
    setUserSlectedAns(name)
  }

  const handleNext = () => {
    let point = 0
    if (userSlectedAns === data[questionIndex].correct_answer) {
      point = 1
    }

    const qna = questionsAndAnswers
    qna.push({
      question: data[questionIndex].question,
      user_answer: userSlectedAns,
      correct_answer: data[questionIndex].correct_answer,
      point,
    })

    if (questionIndex === data.length - 1) {
      return endQuiz({
        totalQuestions: data.length,
        correctAnswers: correctAnswers + point,
        timeTaken,
        questionsAndAnswers: qna,
      })
    }

    setCorrectAnswers(correctAnswers + point)
    setQuestionIndex(questionIndex + 1)
    setUserSlectedAns(null)
    setQuestionsAndAnswers(qna)
  }

  const timeOver = timeTaken => {
    return endQuiz({
      totalQuestions: data.length,
      correctAnswers,
      timeTaken,
      questionsAndAnswers,
    })
  }

  return (
    <Item.Header>
      <Container>
        <Segment>
          <Item.Group divided>
            <Item>
              <Item.Content>
                <Item.Extra>
                  <Header as="h1" block floated="left">
                    <Icon name="info circle" />
                    <Header.Content>
                      {`Question No.${questionIndex + 1} of ${data.length}`}
                    </Header.Content>
                  </Header>
                  <Countdown
                    countdownTime={countdownTime}
                    timeOver={timeOver}
                    setTimeTaken={setTimeTaken}
                  />
                </Item.Extra>
                <br />
                <Item.Meta>
                  <Message size="huge" floating>
                    <Item.Group divided>
                      <Item>
                        <Item.Content verticalAlign='middle' style={{ paddingBottom: '20px' }}>
                          <Markdown
                            remarkPlugins={[remarkMath]}
                            rehypePlugins={[rehypeKatex]}
                        >
                          {data[questionIndex].question}
                        </Markdown>
                        </Item.Content>
                        {data[questionIndex].qImageUrl !== '' ? (
                          <Item.Image src={data[questionIndex].qImageUrl} size="small"  rounded/>
                        // <Item.Image src={tempImageUrl} size="small"   rounded/>
                        ) : null
                        }
                      </Item>
                    </Item.Group>
                  </Message>
                  <br />
                  <Item.Description>
                    <h3>Please choose one of the following answers:</h3>
                  </Item.Description>
                  <Divider />
                  <Menu vertical fluid size="massive">
                    {data[questionIndex].options.map((option, i) => {

                      return (
                        <Menu.Item
                          key={option}
                          name={option}
                          active={userSlectedAns === option}
                          onClick={handleItemClick}
                        >
                          <Markdown
                            remarkPlugins={[remarkMath]}
                            rehypePlugins={[rehypeKatex]}
                          >
                            {`**${i + 1}**.${option}`}
                          </Markdown>
                        </Menu.Item>
                      )
                    })}
                  </Menu>
                </Item.Meta>
                <Divider />
                <Item.Extra>
                  <Button
                    primary
                    content="Next"
                    onClick={handleNext}
                    floated="right"
                    size="big"
                    icon="right chevron"
                    labelPosition="right"
                    disabled={!userSlectedAns}
                  />
                </Item.Extra>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <br />
      </Container>
    </Item.Header>
  )
}

Quiz.propTypes = {
  data: PropTypes.array.isRequired,
  countdownTime: PropTypes.number.isRequired,
  endQuiz: PropTypes.func.isRequired,
}

export default Quiz
