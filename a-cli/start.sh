#!/usr/bin/env sh

# Parse the command line and set variables to control logic
parseCommandLine() {
	# Special case that nothing was provided on the command line so print usage
	# - include this if it is desired to print usage by default
	if [ "$#" -eq 0 ]; then
		printUsage
		exit 0
	fi
	# Indicate specification for single character options
	# - 1 colon after an option indicates that an argument is required
	# - 2 colons after an option indicates that an argument is optional, must use -o=argument syntax
	optstring="hu:b:s:i:v"
	# Indicate specification for long options
	# - 1 colon after an option indicates that an argument is required
	# - 2 colons after an option indicates that an argument is optional, must use --option=argument syntax
	optstringLong="help,url:,branch:,suite:,id:,version"
	# Parse the options using getopt command
	# - the -- is a separator between getopt options and parameters to be parsed
	# - output is simple space-delimited command line
	# - error message will be printed if unrecognized option or missing parameter but status will be 0
	# - if an optional argument is not specified, output will include empty string ''
	GETOPT_OUT=$(getopt --options $optstring --longoptions $optstringLong -- "$@")
	exitCode=$?
	if [ $exitCode -ne 0 ]; then
		echo ""
		printUsage
		exit 1
	fi
	# The following constructs the command by concatenating arguments
	# - the $1, $2, etc. variables are set as if typed on the command line
	# - special cases like --option=value and missing optional arguments are generically handled
	#   as separate parameters so shift can be done below
	eval set -- "$GETOPT_OUT"
	# Loop over the options
	# - the error handling will catch cases were argument is missing
	# - shift over the known number of options/arguments
	while true; do
		#echo "Command line option is $opt"
		case "$1" in
			-h|--help) # -h or --help  Print usage
				printUsage
				exit 0
				;;
			-u|--url)
				git_url=$2
				shift 2
				;;
			-b|--branch)
				git_branch=$2
        shift 2
        ;;
      -s|--suite)
				suite=$2
        shift 2
        ;;
      -i|--id)
				id=$2
        shift 2
        ;;
			-v|--version) # -v or --version  Print the version
				printVersion
				exit 0
				;;
			--) # No more arguments
				shift
				break
				;;
			*) # Unknown option - will never get here because getopt catches up front
				echo ""
				echo "Invalid option $1." >&2
				printUsage
				exit 1
				;;
		esac
	done
	# Get a list of all command line options that do not correspond to dash options.
	# - These are "non-option" arguments.
	# - For example, one or more file or folder names that need to be processed.
	# - If multiple values, they will be delimited by spaces.
	# - Command line * will result in expansion to matching files and folders.
	shift $((OPTIND-1))
	additionalOpts=$*
}

# Print the program usage
# - calling code needs to exit with the appropriate status
printUsage() {
	echo ""
	echo "$program [options] other-vals"
	echo ""
	echo "Download test, run it and upload results."
	echo "Options are:"
	echo ""
	echo "-h                    Print help."
	echo "--help"
	echo "-u url                Specify the git repo url."
	echo "--url <git repo url>"
	echo "-b branch             Specify the git branch."
	echo "--branch <branch name>"
	echo "-s suite              Specify the entry test suite name."
	echo "--suite <entry test suite name>"
	echo "-i id                 Specify the id for upload."
	echo "--id <test id>"
	echo "-v                          Print version."
	echo "--version"
	echo ""
}

# Use git to get folders
handleGit() {
  #git to get content
  git init
  git remote add -f origin $git_url
  git config core.sparsecheckout true
  echo suites/ >> .git/info/sparse-checkout
  echo cases/ >> .git/info/sparse-checkout
  echo ui/ >> .git/info/sparse-checkout
  echo data/ >> .git/info/sparse-checkout
  git pull origin $git_branch
}

# Print the program version
# - calling code needs to exit with the appropriate status
printVersion() {
	echo ""
	echo "$program version:  $version $versionDate"
	echo ""
}

startTest() {
  echo "test start ..."
  echo ""
  echo "$id $suite"
  echo "test finished"
  echo ""
}

uploadResults() {
  echo "upload start ..."
  echo ""
  echo "upload $id"
  echo "upload finished"
  echo ""
}

# Main entry point into shell
program=$(basename $0)
version="1.0.0"
versionDate="2021-05-13"


# Parse the command line options
# - pass all arguments to the function
parseCommandLine "$@"

#start test & upload results

exit 0



