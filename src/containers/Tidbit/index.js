/*
 *
 * Tidbit
 *
 */

 import React from 'react';
 import { connect } from 'react-redux';
 import { shorten_name } from '../../utils/strings';
import TimeAgo from 'react-timeago'
 import './styles.css';
export class Tidbit extends React.Component { // eslint-disable-line react/prefer-stateless-function


	render() {
		const {
			title,
			the_tags,
			name,
			source,
			location,
			onTagClick,
			date
		} = this.props

		var timeAgoFormatter = (value, unit, suffix) => {
		    if (unit !== 'second') {
		      return [value, unit + (value !== 1 ? 's' : ''), suffix].join(' ')
		    }

		    if (suffix === 'ago') {
		      return 'just now'
		    }

		    if (suffix === 'from now') {
		      return 'in a few seconds'
		    }
		  }
		return (
			<div className="tidbit">
				<div className="intro">
					{name ?
						shorten_name(name) + ' ' +
						(location ?
							('from ' + location) : '') + ' learned'
						: ''}
				</div>
				<TimeAgo formatter={timeAgoFormatter} date={(new Date(0)).setUTCSeconds(date)} />
				<div className="tags">
					{the_tags.map((t) => 
						<p 
							key={t} 
							className="tag pill"
							onClick={() => onTagClick(t)}
						>{t}</p>
					)}
				</div>
				<h3 className="title">"{title}"</h3>
				{source 
					?
						<p className="description"><a target="_blank" href={source}>{source}</a></p>
					: undefined}
			</div>
			);
		}
	}



	const mapStateToProps = (state) => ({
	})

	const mapDispatchToProps = (dispatch) => ({
	});

	export default connect(mapStateToProps, mapDispatchToProps)(Tidbit);
