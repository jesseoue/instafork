import React from "react";
import axios from "axios";

class Influencer extends React.PureComponent {
  state = {
    followers: null,
    relevantLikes: null,
    relevantComments: null,
    startingPostIndex: this.props.startingPostIndex,
    endingPostIndex: this.props.endingPostIndex
  };

  constructor(props) {
    super(props);

    axios
      .get(`https://www.instagram.com/${props.username}/?__a=1`)
      .then(response => {
        console.log("response", response.data.graphql.user);

        const relevantPosts = response.data.graphql.user.edge_owner_to_timeline_media.edges.slice(
          props.startingPostIndex,
          props.endingPostIndex
        );

        const relevantLikes = relevantPosts.reduce((prevVal, currentNode) => {
          return prevVal + currentNode.node.edge_liked_by.count;
        }, 0);

        const relevantComments = relevantPosts.reduce(
          (prevVal, currentNode) => {
            return prevVal + currentNode.node.edge_media_to_comment.count;
          },
          0
        );

        this.setState({
          followers: response.data.graphql.user.edge_followed_by.count,
          relevantLikes,
          relevantComments
        });
      });
  }

  render() {
    const { username } = this.props;
    const { followers, relevantLikes, relevantComments } = this.state;

    // console.log("this.state", this.state);

    const avgLikesOnPosts = Math.round((relevantLikes / 7) * 100) / 100;
    const avgLCommentsOnPosts = Math.round((relevantComments / 7) * 100) / 100;
    const avgLikesAndCommentsOnPosts =
      Math.round(((relevantLikes + relevantComments) / 7) * 100) / 100;
    const engagementByLikes =
      Math.round((avgLikesOnPosts / followers) * 10000) / 100;
    const engagementByLikesAndComments =
      Math.round((avgLikesAndCommentsOnPosts / followers) * 10000) / 100;

    return (
      <tr>
        <th scope="row">
          <a target="_blank" href={`https://www.instagram.com/${username}/`}>
            @{username}
          </a>
        </th>
        <td>{followers}</td>
        <td>{avgLikesOnPosts}</td>
        <td>{avgLCommentsOnPosts}</td>
        <td>{avgLikesAndCommentsOnPosts}</td>
        <td>{engagementByLikes}%</td>
        <td>{engagementByLikesAndComments}%</td>
      </tr>
    );
  }
}

Influencer.defaultProps = {
  startingPostIndex: 3,
  endingPostIndex: 10
};

export default Influencer;
