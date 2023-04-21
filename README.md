# Chat App 
- Mui (non experience)
- React Ts, redux toolkit (2 years)

# Feature
- Chat one to one, group
- conversation (load more messages, unread messages, group message by user, type ....)

### `npm start`
http://localhost:5000

## HAVE TO FIX
- a user online multiple website 
- when room_id change on params -> check room info in Room list (left screen) -> not exist -> call api
- nickname and username -> handle show name of user (logic)

- room_list_common (use for both left and right)


*** Task list: REVIEW CODE ***
1. Seen message
   + sender -> message save in db -> this message is read by sender
   + receive new message -> user in room & scroll in the bottom` -> message is read 

   + logic seen message
   -> receive new message 
      - if :(user in room & scroll in the bottom) -> unread_count = 0 && update last_message_seen_by
      - else: update unread_count++, when user scroll to bottom  -> unread_count = 0 && update last_message_seen_by

2. Create room
--- must have to work: roomsCommon, 

-> create room:
   + creator: create success -> waiting dispatch new_message: create room -> action NewMessageNoRoom -> navigate(room_id) -> handle create room success
   + participants: receive new message create room -> action NewMessageNoRoom

3. Api rule


4. Fix create room not found