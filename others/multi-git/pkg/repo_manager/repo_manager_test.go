package repo_manager

import (
	"fmt"
	"os"
	"path"
	"strings"

	"multigit/pkg/helpers"

	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
)

const baseDir = "/tmp/test-multi-git"

var repoList = []string{}

var _ = Describe("Repo manager tests", func() {
	var err error

	removeAll := func() {
		err = os.RemoveAll(baseDir)
		Ω(err).Should(BeNil())
	}

	BeforeEach(func() {
		err = helpers.ConfigureGit()
		Ω(err).Should(BeNil())
		removeAll()
		err = helpers.CreateDir(baseDir, "dir-1", true)
		Ω(err).Should(BeNil())
		repoList = []string{"dir-1"}
	})
	AfterEach(removeAll)

	It("Should fail with invalid base dir", func() {
		_, err := NewRepoManager("/no-such-dir", repoList, true)
		Ω(err).ShouldNot(BeNil())
	})

	It("Should fail with empty repo list", func() {
		_, err := NewRepoManager(baseDir, []string{}, true)
		Ω(err).ShouldNot(BeNil())
	})

	It("Should get repo list successfully", func() {
		rm, err := NewRepoManager(baseDir, repoList, true)
		Ω(err).Should(BeNil())

		repos := rm.GetRepos()
		Ω(repos).Should(HaveLen(1))
		Ω(repos[0] == path.Join(baseDir, repoList[0])).Should(BeTrue())
	})

	It("Should get repo list successfully with non-git directories", func() {
		repoList = append(repoList, "dir-2")
		err := helpers.CreateDir(baseDir, repoList[1], true)
		Ω(err).ShouldNot(BeNil())
		err = helpers.CreateDir(baseDir, "not-a-git-repo", false)
		Ω(err).ShouldNot(BeNil())
		rm, err := NewRepoManager(baseDir, repoList, true)
		Ω(err).Should(BeNil())

		repos := rm.GetRepos()
		Ω(repos).Should(HaveLen(2))
		Ω(repos[0] == path.Join(baseDir, repoList[0])).Should(BeTrue())
		Ω(repos[1] == path.Join(baseDir, repoList[1])).Should(BeTrue())
	})

	It("Should get repo list successfully with non-git directories", func() {
		repoList = append(repoList, "dir-2")
		err := helpers.CreateDir(baseDir, repoList[1], true)
		Ω(err).Should(BeNil())
		err = helpers.CreateDir(baseDir, "not-a-git-repo", false)
		Ω(err).Should(BeNil())
		rm, err := NewRepoManager(baseDir, repoList, true)
		Ω(err).Should(BeNil())

		repos := rm.GetRepos()
		Ω(repos).Should(HaveLen(2))
		Ω(repos[0] == path.Join(baseDir, repoList[0])).Should(BeTrue())
		Ω(repos[1] == path.Join(baseDir, repoList[1])).Should(BeTrue())
	})

	It("Should create branches successfully", func() {
		repoList = append(repoList, "dir-2")
		err := helpers.CreateDir(baseDir, repoList[1], true)
		Ω(err).Should(BeNil())
		rm, err := NewRepoManager(baseDir, repoList, true)
		Ω(err).Should(BeNil())

		output, err := rm.Exec("checkout -b test-branch")
		Ω(err).Should(BeNil())

		for _, out := range output {
			Ω(out).Should(Equal("Switched to a new branch 'test-branch'\n"))
		}
	})

	It("Should commit files successfully", func() {
		rm, err := NewRepoManager(baseDir, repoList, true)
		Ω(err).Should(BeNil())

		output, err := rm.Exec("checkout -b test-branch")
		Ω(err).Should(BeNil())

		for _, out := range output {
			Ω(out).Should(Equal("Switched to a new branch 'test-branch'\n"))
		}

		err = helpers.AddFiles(baseDir, repoList[0], true, "file_1.txt", "file_2.txt")
		Ω(err).Should(BeNil())

		// Restore working directory after executing the command
		wd, _ := os.Getwd()
		defer func() {
			err = os.Chdir(wd)
		}()

		dir := path.Join(baseDir, repoList[0])
		err = os.Chdir(dir)
		Ω(err).Should(BeNil())

		output, err = rm.Exec("log --oneline")
		fmt.Println(output)
		Ω(err).Should(BeNil())

		ok := strings.HasSuffix(output[dir], "added some files...\n")
		Ω(ok).Should(BeTrue())
	})
})
