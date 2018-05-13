import { Component, OnInit } from '@angular/core';
import { CollaborationService } from '../../service/collaboration.service';
import { ActivatedRoute, Params } from '@angular/router';
declare var ace: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  languages: string[] = ['Java', 'Python'];
  language: string = 'Java';
  editor: any;
  defaultContent = {
    "Java": `public class Example {
      public static void main(String[] args) {
      // Type your Java code here
      }
    }`,
    'Python': `class Solution:
    def example():
        # write your python code here.
    `
  };

  sessionId: string;

  //inject CollaborationService, route service
  constructor(private collaboration: CollaborationService, 
              private route: ActivatedRoute) { }

  ngOnInit():void {
    // //init collaboration service
    // this.collaboration.init(this.editor, this.sessionId);
    // //"editor" is the id in html
    // this.editor = ace.edit("editor");
    // this.editor.setTheme("ace/theme/eclipse");
    // this.editor.session.setMode("ace/mode/java");
    // //default set
    // this.editor.setValue(this.defaultContent[this.language]); 
    
    //use problem id as session id, subscribe changes, params changes sessionId update, editor init
    this.route.params
      .subscribe(params => {
        this.sessionId = params['id'];
        this.initEditor();
      })
  }

  initEditor(): void {
    this.editor = ace.edit("editor");
    this.editor.setTheme("ace/theme/eclipse");
    this.resetEditor();

    //set up collaboration socket
    this.collaboration.init(this.editor, this.sessionId);
    this.editor.lastAppliedChange = null;

    //register change callback
    this.editor.on("change", (e) => {
      console.log('editor changes: ' + JSON.stringify(e));
      //check if the change is same as last one, skip the same
      if (this.editor.lastAppliedChange != e) {
        this.collaboration.change(JSON.stringify(e));
      }
    })
  }

  resetEditor(): void {
    this.editor.setValue(this.defaultContent[this.language]);
    this.editor.getSession().setMode(
      "ace/mode/" + this.language.toLowerCase()
    );
  }

  setLanguage(language: string): void {
    this.language = language;
    this.resetEditor();
  }

  submit(): void {
    let user_code = this.editor.getValue();
    console.log(user_code);
  }



}
