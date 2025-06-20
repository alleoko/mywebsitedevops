$('body').css({
    'border': '2px solid #C76E00',
    'border-radius': '8px',
    'padding-top': '30px',
    'padding-left': '50px',
    'box-sizing': 'border-box',
    'background-color': '#1e252e'  // match your terminal background
});

const font = 'Block';

figlet.defaults({ fontPath: 'https://cdn.jsdelivr.net/npm/figlet/fonts' });
figlet.preloadFonts([font], ready);

const formatter = new Intl.ListFormat('en', {
  style: 'long',
  type: 'conjunction',
});

const commands = {
    echo(...args) {
        this.echo(args.join(' '));
    },
    whoami() {
        return [
            'whoami: <white>Alejo Len Aclan</white>',
            'skills: <white>DevOps/Cloud ',
            '* AWSß',
            '* Docker',
            '* Kubernetes',
            '* Jenkins',
            '---------------',
            'my-projects:</white>',
            '* <a href="docker-nodejs.html">Docker and Node.js</a>',
            '* <a href="https://github.com/patorjk/figlet.js/">CICD Jenkins</a>',
            '* <a href="https://github.com/jcubic/isomorphic-lolcat">NGINX, MEMCACHED</a>',
            '<white>----------------</white>',
            '<white>my-contacts</white>',
            '* <a href="https://alleoko.xyz">website</a>',
            '* <a href="https://github.com/jcubic/isomorphic-lolcat">linkedin</a>',
            '* email:alejolenaclan@gmail.com',
            '',
            '<a href="https://github.com/sponsors/jcubic">Sponsor ❤️ my Open Source work</a>',
            ''
        ].join('\n');
    },
    projects() {
        return [
            '',
            'My Projects:',
            '* <a href="https://terminal.jcubic.pl">AWS EC2 S3 Web deployment</a>',
            '* <a href="https://github.com/patorjk/figlet.js/">CICD Jenkins</a>',
            '* <a href="https://github.com/jcubic/isomorphic-lolcat">NGINX, MEMCACHED</a>',
            '',
            '<a href="https://github.com/sponsors/jcubic">Sponsor ❤️ my Open Source work</a>',
            ''
        ].join('\n');
    },
    skills() {
        this.echo(`aws, docker, jenkins, terraform`);
    },
    help() {
        this.echo(`List of available commands: ${help}`);
    }
};

const command_list = ['clear'].concat(Object.keys(commands));
const formatted_list = command_list.map(cmd => `<white class="command">${cmd}</white>`);
const help = formatter.format(formatted_list);

const term = $('body').terminal(commands, {
    prompt: '[[;orange;]guest]@[[;cyan;]alleoko.xzy]:[[;gray;]$ ~]', 
    completion: true,
    checkArity: false,
    greetings: false,
    background: '#1e252e'
});

term.on('click', '.command', function() {
   const command = $(this).text();
   term.exec(command, { typing: true, delay: 50 });
});

function ready() {
    const seed = rand(256);
    term.echo(() => rainbow(render('Alleoko Portal'), seed))
        .echo('\n')
        .echo('====================================================================')          
        .echo('=                                                                  =')
        .echo('=     <white>Type "help" to see the list of available commands.</white>           =')
        .echo('=     <white>Type "whoami" to display my info.</white>                            =')
        .echo('=                                                                  =')
        .echo('====================================================================').resume();
}

function rainbow(string, seed) {
    return lolcat.rainbow(function(char, color) {
        char = $.terminal.escape_brackets(char);
     //   return `[[;${hex(color)};]${char}]`;
          return `[[;white;]${char}]`;
    }, string, seed).join('\n');
}

function rand(max) {
    return Math.floor(Math.random() * (max + 1));
}

function render(text) {
    const cols = term.cols();
    return trim(figlet.textSync(text, {
        font: font,
        width: cols,
        whitespaceBreak: true
    }));
}

function trim(str) {
    return str.replace(/[\n\s]+$/, '');
}

function hex(color) {
//    return '#' + [color.red, color.green, color.blue].map(n => {
//        return n.toString(16).padStart(2, '0');
//    }).join('');
}
