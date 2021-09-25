package repo_manager

import (
	"errors"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
)

type RepoManager struct {
	repos        []string
	ignoreErrors bool
}

//NewRepoManager checks if the provided baseDir exists and then create a new RepoManager instance with the provided repo names
func NewRepoManager(baseDir string, repoNames []string, ignoreErrors bool) (repoManager *RepoManager, err error) {
	_, err = os.Stat(baseDir)
	if err != nil {
		if os.IsNotExist(err) {
			err = fmt.Errorf("[repo_manager] base dir: '%s' doesn't exist", baseDir)
		}
		return
	}

	baseDir, err = filepath.Abs(baseDir)
	if err != nil {
		return
	}

	if baseDir[len(baseDir)-1] != '/' {
		baseDir += "/"
	}

	if len(repoNames) == 0 {
		err = errors.New("[repo_manager] repo list can't be empty")
		return
	}

	repoManager = &RepoManager{
		ignoreErrors: ignoreErrors,
	}

	for _, repo := range repoNames {
		if repo == "" {
			err = errors.New("repo name can't be empty")
			return
		}

		path := baseDir + repo
		repoManager.repos = append(repoManager.repos, path)
	}

	return
}

//GetRepos
func (instance *RepoManager) GetRepos() []string {
	return instance.repos
}

//Exec the provided command for the available repo and return the output from each repository or an error
func (instance *RepoManager) Exec(cmd string) (output map[string]string, err error) {
	output = map[string]string{}
	var (
		components []string
		multiWord  []string
	)

	for _, component := range strings.Split(cmd, " ") {
		if strings.HasPrefix(component, "\"") {
			multiWord = append(multiWord, component[1:])
			continue
		}

		if len(multiWord) > 0 {
			if !strings.HasSuffix(component, "\"") {
				multiWord = append(multiWord, component)
				continue
			}

			multiWord = append(multiWord, component[:len(component)-1])
			component = strings.Join(multiWord, " ")
			multiWord = []string{}
		}
		components = append(components, component)
	}

	// Restore working directory after executing the command
	wd, _ := os.Getwd()
	defer func() {
		err = os.Chdir(wd)
	}()

	var out []byte

	for _, repo := range instance.repos {
		err = os.Chdir(repo)
		if err != nil {
			if instance.ignoreErrors {
				continue
			}
			err = fmt.Errorf("[repo_manager]: can't change directory to %s", repo)
		}

		// Execute the command
		out, err = exec.Command("git", components...).CombinedOutput()
		// Store the result
		output[repo] = string(out)

		// Bail out if there was an error and NOT ignoring errors
		if err != nil && !instance.ignoreErrors {
			return
		}
	}
	return
}
