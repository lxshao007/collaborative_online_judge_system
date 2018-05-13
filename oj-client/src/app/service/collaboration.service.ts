import { Injectable } from '@angular/core';

declare var io: any;

@Injectable()
export class CollaborationService {

  collaborationSocket: any;
  constructor() { }

  init(editor: any, sessionId: string): void {
    this.collaborationSocket = io(window.location.origin, {query: 'sessionId=' + sessionId});
    //handle the changes sent from server
    this.collaborationSocket.on("change", (delta: string)=>{
      // console.log("receive ok");
      console.log('collabration: editor changes by ' + delta);
      delta = JSON.parse(delta);
      editor.lastAppliedChange = delta;
      //apply the changes on editor
      editor.getSession().getDocument().applyDeltas([delta]);
    })
  }

  //emit event to make changes and inform server and other collabration
  change(delta: string): void {
    //emit "change" event
    // console.log("emit ok");
    this.collaborationSocket.emit("change", delta);
  }

}
