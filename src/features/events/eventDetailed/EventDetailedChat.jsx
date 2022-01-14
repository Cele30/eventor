import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Segment, Header, Comment } from "semantic-ui-react";
import {
  firebaseObjectToArray,
  getEventChatRef,
} from "../../../app/services/firebaseService";
import EventDetailedChatForm from "./EventDetailedChatForm";
import { onValue, off } from "firebase/database";
import { listenToEventChat, clearComments } from "../eventSlice";
import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";
import { createDataTree } from "../../../app/common/util/util";

function EventDetailedChat({ eventId }) {
  const { comments } = useSelector(state => state.event);
  const dispatch = useDispatch();
  const [showReplyForm, setShowReplyForm] = useState({
    open: false,
    commentId: null,
  });

  useEffect(() => {
    onValue(getEventChatRef(eventId), snapshot => {
      if (!snapshot.exists()) return;

      dispatch(
        listenToEventChat(firebaseObjectToArray(snapshot.val()).reverse())
      );
    });

    return () => {
      dispatch(clearComments());
      off(getEventChatRef()); // turns off listener
    };
  }, [dispatch, eventId]);

  const handleCloseRepltForm = () => {
    setShowReplyForm({ open: false, commentId: null });
  };

  return (
    <>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: "none" }}
      >
        <Header>Chat about this event</Header>
      </Segment>

      <Segment attached>
        <EventDetailedChatForm
          eventId={eventId}
          parentId={0}
          closeForm={handleCloseRepltForm}
        />

        <Comment.Group>
          {createDataTree(comments).map(comment => (
            <Comment key={comment.id}>
              <Comment.Avatar src={comment.photoURL || "/assets/user.png"} />
              <Comment.Content>
                <Comment.Author as={Link} to={`/profile/${comment.uid}`}>
                  {comment.displayName}
                </Comment.Author>
                <Comment.Metadata>
                  <div>
                    {formatDistance(comment.date, new Date(), {
                      addSuffix: true,
                    })}
                  </div>
                </Comment.Metadata>
                <Comment.Text>
                  {comment.text.split("\n").map((text, index) => (
                    <span key={index}>
                      {text}
                      <br />
                    </span>
                  ))}
                </Comment.Text>
                <Comment.Actions>
                  <Comment.Action
                    onClick={() =>
                      setShowReplyForm({ open: true, commentId: comment.id })
                    }
                  >
                    Reply
                  </Comment.Action>
                  {showReplyForm.open &&
                    showReplyForm.commentId === comment.id && (
                      <EventDetailedChatForm
                        eventId={eventId}
                        parentId={comment.id}
                        closeForm={handleCloseRepltForm}
                      />
                    )}
                </Comment.Actions>
              </Comment.Content>

              {comment.childNodes.length > 0 && (
                <Comment.Group>
                  {comment.childNodes.reverse().map(child => (
                    <Comment key={child.id}>
                      <Comment.Avatar
                        src={child.photoURL || "/assets/user.png"}
                      />
                      <Comment.Content>
                        <Comment.Author as={Link} to={`/profile/${child.uid}`}>
                          {child.displayName}
                        </Comment.Author>
                        <Comment.Metadata>
                          <div>
                            {formatDistance(child.date, new Date(), {
                              addSuffix: true,
                            })}
                          </div>
                        </Comment.Metadata>
                        <Comment.Text>
                          {child.text.split("\n").map((text, index) => (
                            <span key={index}>
                              {text}
                              <br />
                            </span>
                          ))}
                        </Comment.Text>
                        <Comment.Actions>
                          <Comment.Action
                            onClick={() =>
                              setShowReplyForm({
                                open: true,
                                commentId: child.id,
                              })
                            }
                          >
                            Reply
                          </Comment.Action>
                          {showReplyForm.open &&
                            showReplyForm.commentId === child.id && (
                              <EventDetailedChatForm
                                eventId={eventId}
                                parentId={child.parentId}
                                closeForm={handleCloseRepltForm}
                              />
                            )}
                        </Comment.Actions>
                      </Comment.Content>
                    </Comment>
                  ))}
                </Comment.Group>
              )}
            </Comment>
          ))}
        </Comment.Group>
      </Segment>
    </>
  );
}

export default EventDetailedChat;
