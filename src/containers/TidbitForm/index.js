
/*
 *
 * TidbitForm
 *
 */

 import React from 'react';
 import { connect } from 'react-redux';
 import './styles.css';
 import { shorten_name } from '../../utils/strings';
 import {
  createTidbitRequest,
} from '../Tidbits/actions';

export class TidbitForm extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);

    this.state = {
      modes: ['title','tag','name','location','source'],
      mode: 'title',
      title: '',
      tag: '',
      name: '',
      location: '',
      source: '',
      tags: [],
      active: false
    };
  }
  handleChange(e) {
    this.setState({ [this.state.mode]: e.target.value });
  }

  removeTag(tag) {
    this.setState({ 
      tags: this.state.tags.filter((f) => f.toLowerCase() !== tag.toLowerCase())
    });
  }

  submit(e) {
    if(e) {
      if(e.key !== 'Enter') {
        return;
      }
    }

     if (this.state.mode === 'tag') {
        if(this.state.tags.map((a) => a.toLowerCase()).indexOf(this.state.tag.toLowerCase()) === -1) {
            if(this.state.tag !== '') {
              this.state.tags.push(this.state.tag)
              this.setState({tag: ''})
            } 

            if(this.state.tags.length === 1) {
              this.setState({mode: 'name'})  
            }
        }
      } else {
        var index = this.state.modes.indexOf(this.state.mode)
        if(index === this.state.modes.length - 1 ) {
          this.setState({mode: ''})  
        } else {
          this.setState({mode: this.state.modes[index+1]})  
        }
      }
  }

  publish(e) {
    this.props.createTidbit({
      title: this.state.title,
      tags: this.state.tags,
      name: this.state.name,
      location: this.state.location,
      source: this.state.source
    })

    this.setState({ 
      mode: 'title',
      title: '',
      tags: [],
      name: '',
      location: '',
      source: '',
      tag: '',
      active: false
    })    
  }

  render() {

    var input = ''

  switch(this.state.mode) {
    case 'title':
      input = <input 
        className="new-tidbit-input" 
        placeholder="What did you learn today?"
        value={this.state.title} 
        onChange={ this.handleChange.bind(this) } 
        onKeyPress={this.submit.bind(this)}
        onFocus={() => this.setState({active: true})}
       />
       break;
    case 'tag':
     input = <input 
        className="new-tidbit-input" 
        placeholder="Add a tag"
        value={this.state.tag} 
        onChange={ this.handleChange.bind(this) } 
        onKeyPress={this.submit.bind(this)}
       />
       break;
    case 'name':
     input = <input 
        className="new-tidbit-input" 
        placeholder="What's your name?"
        value={this.state.name} 
        onChange={ this.handleChange.bind(this) } 
        onKeyPress={this.submit.bind(this)}
       />
       break;
    case 'location':
     input = <input 
        className="new-tidbit-input" 
        placeholder="Where are you from?"
        value={this.state.location} 
        onChange={ this.handleChange.bind(this) } 
        onKeyPress={this.submit.bind(this)}
       />
       break;
    case 'source':
     input = <input 
        className="new-tidbit-input" 
        placeholder="https://"
        value={this.state.source} 
        onChange={ this.handleChange.bind(this) } 
        onKeyPress={this.submit.bind(this)}
       />
       break;
    default:
      break
     }

    return (
      <div className={"tidbitForm " + (this.state.active ? 'active' : null)}>
        { input }
         <div className="extras">
            <div className="buttons">
              {// this.state.modes.filter((m) => !this.state[m].length || this.state.mode === m).map((m) => 
                 this.state.modes.map((m) => 
                  <p className={"button " + (this.state.mode === m ? 'active' : '')} key={m} onClick={() => this.setState({mode: m})}>+ {m}</p> 
                )}
            </div>
            <div className="tags">
              {this.state.tags.map((tag) =>
                <p onClick={() => this.removeTag(tag)} key={tag.toLowerCase()} className="tag  pill">{tag}</p>
              )}
            </div>
            {this.state.tags.length > 0 || this.state.mode !== 'title' ? <p className="tidbit-title" onClick={() => this.setState({mode: 'title'})}>"{this.state.title}"</p> : undefined} 
            <div className="info">
              {this.state.modes.filter((m) => m !== 'tag' && m !== 'title').map((m) => 
                <p className={"label " + (m === 'source' ? 'source' : '')}  key={m} onClick={() => this.setState({mode: m})}>
                {m === 'name' ? shorten_name(this.state.name) : this.state[m]}
                </p> 
              )}
            </div>
            {this.state.mode !== '' && (this.state.mode !== 'title' || this.state.title.length > 5) ? 
                <p className="submit" onClick={ (e) => this.submit(false)}>{this.state.mode === 'tag' ? 'Add' : 'Set' } { this.state.mode }</p>
              : null}
         
            {this.state.title.length > 5 ? 
              <p className="publish"  onClick={this.publish.bind(this)}>{this.state.mode === 'source' ? 'Set Source & Publish' : 'Publish' }</p>
              : null}
         
        </div>


      </div>
    );
  }
}




 const mapDispatchToProps = (dispatch) => ({
  createTidbit: (payload) => dispatch(createTidbitRequest(payload))
});

export default connect(null, mapDispatchToProps)(TidbitForm);
