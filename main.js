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
            'works: <white>Application System Engineer / Cloud @ Fujitsu</white>',
            'skills: <white>DevOps/Cloud ❤️ ',
            '* Application Support & System Engineering',
            '* DevOps Fundamentals',
            '* DevSecOps (Foundational – Actively Learning)',
            '* CI/CD – Jenkins',
            '* Code Quality & Security – SonarQube, Trivy',
            '* Containers – Docker, Kubernetes',
            '* Infrastructure as Code – Terraform (Learning)',
            '* Cloud – AWS (EC2, S3 – ELB, IAM, VPC Basics, CloudWatch, RDS, Route53 etc)',
            '* Version Control – Git',
            '* Operating Systems – Linux , Windows',
            '* Databases – MySQL, PostgreSQL',
            '-----------------------------------------------------------------------',
            'my-projects:</white>',
            '* <a href="pr-docker-nodejs.html">Docker and Node.js</a>',
            '* <a href="pr-simple-ec2-terraform.html">Simple EC2 using Terraform</a>',
            '* <a href="pr-jenkins-sonarqube.html">Sonarqube and Jenkins Pipeline</a>',
            '* <a href="pr-s3-web-hosting.html">AWS S3 Web hosting</a>',
            '<white>-------------------------------------------------------------------</white>',
            '<white>my-certificates:</white>',
            '* <a href="https://www.credly.com/users/alejo-len-aclan">Credly</a>',
            '<white>my-contacts:</white>',
            '* <a href="https://alleokloud.space">website</a>',
            '* <a href="https://www.linkedin.com/in/alejo-len">linkedin</a>',
            '* email:alejolenaclan@gmail.com',
            '<a href="https://github.com/alleoko">Sponsor ❤️ my Open Source work in GITHUB</a>'
        ].join('\n');
    },
    projects() {
        return [
            '',
            'My Projects:',
            '* <a href="https://terasdasd">AWS EC2 S3 Web deployment</a>',
            '* <a href="https://giasdasd.js/">CICD Jenkins</a>',
            '* <a href="https://githuasdasdasdadcat">NGINX, MEMCACHED</a>'
        ].join('\n');
    },
    help() {
        this.echo(`List of available commands: ${help}`);
    }
};

const command_list = ['clear'].concat(Object.keys(commands));
const formatted_list = command_list.map(cmd => `<white class="command">${cmd}</white>`);
const help = formatter.format(formatted_list);

const term = $('body').terminal(commands, {
    prompt: '[[;orange;]guest]@[[;cyan;]alleokloud]:[[;gray;]$ ~]', 
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
    term.echo(() => rainbow(render('Alleokloud Space'), seed))
        .echo('\n')
        .echo('========================================================================')          
        .echo('=                                                                      =')          
        .echo('=     <white>Hi! 👋 my name is Alejo, Software Engineer / Devops / Cloud</white>      =')
        .echo('=                                                                      =')          
        .echo('=     <white>Type <orange>"whoami"</orange> to display my other info.</white>                          =')
        .echo('=     <white>Type <yellow>"help"</yellow> to see the list of available commands.</white>               =')
        .echo('=                                                                      =')
        .echo('========================================================================').resume();
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
