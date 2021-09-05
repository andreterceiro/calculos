import {Command, flags} from '@oclif/command'
var inquirer = require('inquirer')

class Calculus extends Command {
  static description:string = 'Game of calculus'
  
  private totalTime:number = 0;
  private gameTime:number = 0;
  private numberOfDigits: string = '0'
  private operations:string[] = [''];
  private lifes = 3;
  
  static flags = {
    // add --version flag to show CLI version
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'})
  }

  async run() {
      this.gameTime = 10
	  setInterval(
	      this.updateTotalTime,
	      1000
	  );
	
      this.parse(Calculus);
    
      this.adjustOperation(await this.selectOperation());
      
      await this.selectNumberOfDigits()
      
      while (this.lifes > 0) {
          //this.newGame()
      }
  }
  
  
  async selectNumberOfDigits(): Promise<void> {
        const self = this
        await inquirer.prompt({
			name: 'operacao',
			type: 'list',
			message: 'Por favor selecione o número de dígitos',
			choices: ['1', '2', '3', '4', '5']
		}).then(function(answer: string) {
			self.numberOfDigits = answer
		});
  }
  
  async selectOperation(): Promise<string> { 
      await inquirer.prompt({
		name: 'operacao',
		type: 'list',
		message: 'Por favor selecione a operação',
		choices: ['+', '-', '*', '/', 'Todas']
	  }).then(function(answer: any) {
		return answer;	
	  });
	  return '';
  }
  
  adjustOperation(operation: string): void {
      if (operation == "Todas") {
          this.operations = ['+', '-', '*', '/'];
	  } else {
		  this.operations = [operation];
	  }
  }
  
  updateTotalTime(): void {
      if (this.gameTime == undefined) {
          this.gameTime = 0
      }
      this.gameTime = this.gameTime + 1
  }
}

export = Calculus;
