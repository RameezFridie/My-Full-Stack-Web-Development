// Importing modules and files being tested
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Music from './components/Music'


it.todo("api"), done => {
  function callBack(data) {
    expect(data).toBe("data")
    done()
  }
  callBack()
  const div = document.createElement("div")
  ReactDOM.render( <Music/> , div)
  ReactDOM.unmountComponentAtNode(div)
}

it("Passed", () => {
  const component = renderer.create(<Music/>)
  let app = component.toJSON()
  expect(app).toMatchSnapshot()
})
