import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
    //"editor" is the id in html
    this.editor = ace.edit("editor");
    this.editor.setTheme("ace/theme/eclipse");
    this.editor.session.setMode("ace/mode/java");
    //default set
    this.editor.setValue(this.defaultContent[this.language]);
    
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
