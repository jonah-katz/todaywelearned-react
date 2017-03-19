/*
 *
 * Tidbits
 *
 */

 import React from 'react';
 import { connect } from 'react-redux';
 import Helmet from 'react-helmet';
 import './styles.css';
 import Tidbit from '../Tidbit'
 import TidbitForm from '../../containers/TidbitForm'
 import {
  fetchTidbitsRequest,
  removeTag,
  addTag
} from './actions';



export class Tidbits extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount () {
    this.props.fetchTidbits();
  }

  render() {
    const {
      tidbits,
      tags,
      removeTag
    } = this.props

    return (
      <div className="tidbits">
      <Helmet
      title="Tidbits"
      meta={[
        { name: 'description', content: 'Description of Tidbits' },
        ]}
        />
        <TidbitForm />
        {tags.size ? 
            <div className="tags-filter">
              {
                tags.map((tag) => 
                  <p key={tag} className="tag pill" onClick={() => removeTag(tag)}>{ tag }</p>
                )
              }
            </div> : null}

        <div className="tidbits-list">
          {tidbits.map(tidbit => 
            <Tidbit  
              id={tidbit.get('id')} 
              title={tidbit.get('title')}
              description={tidbit.get('description')}
              date={tidbit.get('date')}
              the_tags={tidbit.get('the_tags')}
              source={tidbit.get('source')}
              name={tidbit.get('name')}
              location={tidbit.get('location')}
              key={tidbit.get('id')}
              onTagClick={this.props.addTag} 
            /> 
          )}
        </div>
        </div>
        );
      }
    }
    const mapStateToProps = (state) => {
      return {
        tidbits: state.get('tidbits').get('allTidbits').valueSeq().toArray().sort((a, b) => {
          return new Date(b.get('date')).getTime() - new Date(a.get('date')).getTime()
        }),
        tags: state.get('tidbits').get('activeTags')
     }
   }

   const mapDispatchToProps = (dispatch) => ({
    fetchTidbits: () => dispatch(fetchTidbitsRequest()),
    addTag: (payload) => dispatch(addTag(payload)),
    removeTag: (payload) => dispatch(removeTag(payload))
  });

  export default connect(mapStateToProps, mapDispatchToProps)(Tidbits);
